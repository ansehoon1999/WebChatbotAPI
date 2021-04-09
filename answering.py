import argparse
import logging
import math
import time
import gluonnlp as nlp
import mxnet as mx
import pandas as pd
from gluonnlp.data import SentencepieceTokenizer
from kogpt2.mxnet_kogpt2 import get_mxnet_kogpt2_model
from kogpt2.utils import get_tokenizer
import pyrebase
from datetime import datetime
import requests
import json





#Gluon에서 신경망을 만든
from mxnet import gluon, nd
from mxnet.gluon import nn



logger = logging.getLogger()
logger.setLevel(logging.INFO)

U_TKN = '<usr>'
S_TKN = '<sys>'
BOS = '<s>'
EOS = '</s>'
MASK = '<unused0>'
SENT = '<unused1>'

#train_set = ChatDataset(data셋, get_tokenizer(), vocab, max_len=max_len)
class ChatDataset(gluon.data.Dataset):
    #chats = data 엑셀
    def __init__(self, chats, tok_path, vocab, max_len=32):
        self._data = chats
        self._tok_path = tok_path #get_tokenizer()
        self.tokenizer = None     #None
        self.first = True         #first
        self.q_token = U_TKN      #<usr>
        self.a_token = S_TKN      #<sys>
        self.sent_token = SENT    #<unused1>
        self.bos = BOS            #<s>
        self.eos = EOS            #</s>
        self.maskt = MASK         #<unused0>
        self.vocab = vocab
        self.max_len = max_len
        self.padder = nlp.data.PadSequence(
            max_len, pad_val=self.vocab[self.vocab.padding_token])

    #tokenizer에서
    def _activate_sp(self):
        self.tokenizer = nlp.data.SentencepieceTokenizer(self._tok_path, 0, 0)

    def __len__(self):
        return len(self._data)

    def __getitem__(self, idx):
        if self.tokenizer is None:
            self._activate_sp()

        #하나의 데이터 문장 [사용자가 물어보는 문장, 챗봇이 대답하는 문장, 감정 분류]
        turn = self._data.iloc[idx]



        #=================================================================


        #사용자가 물어보는 문장['Q']
        q = turn['Q']
        #챗봇이 대답하는 문장['A']
        a = turn['A']
        #감정 분류 숫자
        sentiment = str(turn['label'])

        #사용자가 물어보는 문장을 토큰화하기
        q_toked = [
            self.q_token, #<usr>
        ] + self.tokenizer(q) + [ #사용자가 물어보는 문장에 대해 토큰화하기
            self.eos,  #</s>
        ] + [self.sent_token] + self.tokenizer(sentiment) + [ #감정 분류
            self.eos, #</s>
        ]

        #사용자가 물어보는 문장에 대해 토큰화한거에 대한 길이
        q_len = len(q_toked)

        #챗봇이 대답하는 문장['A']
        a_toked = [
            self.a_token, #<sys>
        ] + self.tokenizer(a) + [ #챗봇이 대답하는 문장 토큰화하기
            self.eos, #</s>
        ]

        #챗봇이 대답하는 문장 길이
        a_len = len(a_toked)


        #=================================================================

        #만약에 챗봇이 대답하는 문장의 길이와 사용자가 물어보는 문장의 길이가
        #최대 설정 길이보다 크다면


        #=================================================================
        #예외 처리 코드
        if q_len + a_len > self.max_len:
            a_len = self.max_len - q_len
            a_toked = a_toked[-a_len:]
            assert a_len == len(a_toked)

        #=================================================================

        # [<mask>, <mask>, ...., <mask>, ..., A.. <eos>, <pad>....]
        # ex) ['<unused0>', '<unused0>', '<unused0>', '<unused0>', '<unused0>', '<unused0>', '<unused0>', '<unused0>',
        #'<unused0>', '<unused0>', '▁하루가', '▁또', '▁가', '네요', '.', '</s>']

        labels = [
            self.maskt, #MASK
        ] * q_len + a_toked[1:] #<sys>만 빼고['▁하루가', '▁또', '▁가', '네요', '.', '</s>']

        #만약에 처음이라면 self.first == True 라면?
        if self.first:
            #다음 내용들을 출력한다
            logging.info("contexts : {} \ntoked ctx: {} \nresponse : {} \ntoked response {} \nlabels {}".format(q, q_toked, a, a_toked, labels))

            self.first = False

        #ex) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        #1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        mask = [0] * q_len + [1] * a_len + [0] * (self.max_len - q_len - a_len)

        return (self.padder(self.vocab[q_toked + a_toked]), nd.array(mask),
                self.padder(self.vocab[labels]))


        #([2, 385, 47460, 47437, 49108, 47812, 1, 7, 640, 1, 4, 33203, 252, 119, 7974, 47440, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        #[0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 1. 1. 1. 1. 1. 1. 1. 0. 0. 0. 0. 0. 0. 0.
        #0. 0. 0. 0. 0. 0. 0. 0.]
        #<NDArray 32 @cpu(0)>, [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 33203, 252, 119, 7974, 47440, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3])



class KoGPT2Chat(nn.HybridBlock):
    def __init__(self, kogpt2, prefix=None, params=None):
        super(KoGPT2Chat, self).__init__(prefix=prefix, params=params)
        self.kogpt2 = kogpt2

    def hybrid_forward(self, F, inputs):
        # (batch, seq_len, hiddens)
        output, _ = self.kogpt2(inputs)
        return output


if mx.context.num_gpus() > 0:
    ctx = mx.gpu()
else:
    ctx = mx.cpu()

model_params = 'C:\\Users\\PC\\Desktop\\chat ui\\KoGPT2-chatbot\\kogpt2_chat.params'
sent = '0'
tok_path = get_tokenizer()
model, vocab = get_mxnet_kogpt2_model(ctx=ctx)
tok = SentencepieceTokenizer(tok_path, num_best=0, alpha=0)
kogptqa = KoGPT2Chat(model)
kogptqa.load_parameters(model_params, ctx=ctx)
sent_tokens = tok(sent)

url = "http://localhost:3000"
data = {'msg': 'Hi!!!'}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

res = requests.post(url, data=json.dumps(data), headers=headers)

while 1:
        try :
            q = res.json()['user']
        except :
            q = "안녕"
        
        print(q)
        if q == 'quit':
            break
        q_tok = tok(q)
        a = ''
        a_tok = []
        while 1:
            input_ids = mx.nd.array([vocab[U_TKN]] + vocab[q_tok] +
                                    vocab[EOS, SENT] + vocab[sent_tokens] +
                                    vocab[EOS, S_TKN] +
                                    vocab[a_tok]).expand_dims(axis=0)
            pred = kogptqa(input_ids.as_in_context(ctx))
            gen = vocab.to_tokens(
                mx.nd.argmax(
                    pred,
                    axis=-1).squeeze().astype('int').asnumpy().tolist())[-1]
            if gen == EOS:
                break
            a += gen.replace('▁', ' ')
            a_tok = tok(a)
        

        data = {'msg': a.strip()}
        res = requests.post(url, data=json.dumps(data), headers=headers)

        print("후니베어> {}".format(a.strip()))
        chatting = {"chat":[q, a]}
#인터프리터에서 직접 실행된 경우에만 IF문 이하의 코드를 실행한
#CMD에서 python train.py를 하면 실행된다
