const dialogflow = require('@google-cloud/dialogflow').v2;
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const admin = require(''); //firebase admin position
var strftime = require('strftime');

var serviceAccount = require("") // firebase json file position
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "" // firebase database url
});

const db = admin.database();
const app = express();
const port = 3000;

const sessionId = uuid.v4();

app.use(bodyParser.urlencoded({
  extended:false
}))
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
var data='';


var color_result="";
var color_explain="";

var result = 0
var type = '';

var first_cause = '';
var second_cause = '';
var third_cause = '';
var forth_cause = '';
var fifth_cause = '';
var sixth_cause = '';
var value = 0;

var red = 0;
var orange = 0;
var yellow = 0;
var green = 0;
var blue = 0;
var purple = 0;
var pink = 0;

app.post('/send-msg1', (req, res)=>{

      runSample(req.body.MSG).then(data=>{
      res.send({Reply:data});
      const newContact = {
        request: req.body.MSG,
        response: data
      };
  //===================================================================

    if(req.body.MSG.includes('1'))
    {
      value = 1;
      result = result + value;
    }
    else if(req.body.MSG.includes('2')) {
      value = 2;
      result = result+value;

    }
    else if(req.body.MSG.includes('3')) {
      value = 3;
      result = result + value;
    }
    else if(req.body.MSG.includes('4')) {
      value = 4;
      result = result + value;
    }
    console.log('result: ', result);



  //===================================================================
  if(data.includes("최근에 혹시 후회스럽고 서운한 일이 있었니?")) {
      green = green + value; //
      // 1번
  }
  else if(data.includes("지금 혹시 당황해서 어쩔 줄 몰라 하고 있어??")) {
      //2번
      orange = orange + value; //
      purple = purple + value; //4
  }
  else if(data.includes("앞으로 불행이 있을까봐 걱정하고 있거나 혹시 최근에 그런 생각을 자주해??")) {
      //3번
      pink = pink + value; //1

  }
  else if(data.includes("현재 어느 정도 불안해?")) {
      //4번
      orange = orange + value; //
      yellow = yellow + value; //
      pink = pink + value; //2
  }
  else if(data.includes("막 최근에 짜증스럽고 누군가에게 직접적으로 짜증낸 적 있어")) {
      //5번
      orange = orange + value; //
      yellow = yellow + value; //
      pink = pink + value; //3
      purple = purple + value; //5

  }
  else if(data.includes("막 지금 마음이 조마조마하고 그러니?")) {
      //6번
      blue = blue + value;  //
      green = green + value; //
  }
  else if(data.includes("그럼 너무 극도로 긴장해서 어디가 아프거나 그런 적은 있었어?")) {
      //7번
      red = red + value; //
  }
  else if(data.includes("지금 그러면 막 걱정하고 있니?")) {
      //8번
      green = green + value; //
  }
  else if(data.includes("그렇다면 흥분되어 어쩔 줄 몰라한 적은 있어?")) {
      //9번
      red = red + value; //
      green = green + value; //
  }
  else if(data.includes("이제 설문지의 절반이 끝났어!! 여기 까지하느라 고생 많았구 좀 만 더 해보자!")) {
      //10번
      blue = blue + value; //
  }
  else if(data.includes("최근에 마음이 든든하다고 생각한 적이 없었니?")) {
      //11번
      purple = purple + value; // ㅔ3
  }
  else if(data.includes("그럼 최근에 마음이 편한 적이 없었니?")) {
      //12번
      green = green + value; //
  }
  else if(data.includes("그럼 마음 역시 안 놓였겠네 맞지?")) {
      //13번
      purple = purple + value; //ㅔ2
      pink = pink + value; // 4

  }
  else if(data.includes("그럼 마음이 놓인 적이 없다면 설마 자신감도 많이 떨어졌니?")) {
      //14번
      pink = pink + value; //5
  }
  else if(data.includes("그럼 마음의 긴장이 풀려 푸근했던 적은 없었어?")) {
      //15번
      yellow = yellow + value; //
      red = red + value; //
  }
  else if(data.includes("그럼 지금 혹시 자신 혹은 주변 상황에 대해 불만족스럽니?")) {
      //16번
      purple = purple + value; //ㅔ1
  }
  else if(data.includes("지금 마음 속으로는 불편함 역시 느끼는 거야?")) {
      //17번
      blue = blue + value; //
      yellow = yellow + value; //

  }
  else if(data.includes("만약 최근에 불안함을 느꼈다면 막 즐겁다는 기분을 느껴본 적이 없겠네?")) {
      //18번
      blue = blue + value; //

  }
  else if(data.includes("드디어 마지막 질문이야! 끝까지 힘을 내줘~~ 그럼 현재 기분은 별로야? 막 꿀꿀하고 그래?")) {
      //19번
      blue = blue + value; //
      red = red + value; //
      orange = orange + value; //
      yellow = yellow + value; //

  }
  else if(data.includes("드디어 끝났어! 많은 문항에 대답하느라 수고 많았어 ㅜㅜ 이제 다음으로 넘어가면 결과를 확인할 수 있을거야")) {
      //20번
      red = red + value; //
      orange = orange + value; //
  }

  //===================================================================

  if(result < 52 ) {
    type = '상태 불안이 정상인 편';
  }
  else if (result >= 52 && result <= 56 ) {
    type = '불안 수준이 약간 높은 편';
  }
  else if (result >= 57 && result <= 61 ) {
    type = '불안 수준이 상당히 높은 편';
  }
  else if (result >=62) {
    type = '불안 수준이 매우 높은 편';
  }

  if(data.includes('드디어 끝났어! 많은 문항에 대답하느라 수고 많았어 ㅜㅜ 이제 다음으로 넘어가면 결과를 확인할 수 있을거야')) {
    var max = Math.max(red, orange, yellow, green, blue, purple, pink);
    if(max == red) {
      color_result = "빨간색";
      color_explain = "기운을 북돋는 강렬한 빨강은 추진력이 필요할 때, 우울한 기분이 들 때나 몹시 지칠 때, 신체의 행동력과 에너지 등을 깨울 수 있는 색입니다. 그러므로, 내면에 집중된 정신을 밖으로 분산시켜, 무기력한 삶에 의욕을 불어넣어 줘 자신감을 높여주는 효과를 볼 수 있는 컬러입니다. 특히, 빨간색에는 아드레날린을 분비시키는 효과가 있어 혈압과 체온을 상승시켜주는 동시에, 원기를 불어넣어 줍니다";
    }
    else if(max == orange) {
      color_result = "주황색";
      color_explain = "따뜻하고 활발한 기운을 가진 주황색은 몸과 마음을 모두 데워주는 색으로, 상대에게 웃음이나 긍정적인 반응을 유발하고자 할 때 자주 사용됩니다. 정과 유대감이 강한 사람들이 이 색을 좋아합니다. 그러므로, 남의 잘못을 너그럽게 받아들이거나 용서해주는 역할을 할 뿐만 아니라, 마음에 안정을 가져다줍니다.";
    }
    else if(max == yellow) {
      color_result = "노란색";
      color_explain = "열린 마음을 상징하는 색으로, 내향적인 성향보다는 외향적인 성향을 드러냅니다. 그러므로, 노란색은 결정장애나 의욕 저하를 겪는 상황에 도움이 됩니다. 피에로의 의상에 노란색이 많이 들어간 이유도 스펀지 밥, 심슨 등 만화 캐릭터가 노란색으로 자주 만들어지는 이유도 이 때문입니다.";
    }
    else if(max == green) {
      color_result = "녹색";
      color_explain = "푸릇푸릇한 대자연을 연상케 해주는 초록색은 마음을 안정시키고 감정의 균형을 이뤄주는 역할을 합니다. 또 의학적으로도 눈의 피로를 덜어주어 시력에 좋은 색이라고 알려져 있으며, 정신건강에 긍정적인 효과를 얻을 수 있기에 우울증 및 스트레스를 받았을 때, 여유를 느끼고 싶을 때 지친 심신에 기운을 북돋워 줄 수 있습니다. 특히, 체내에 축적된 유해한 물질들을 제거해주기 때문에 디톡스와 동일한 효과를 기대할 수 있습니다. 그로 인해, 교감 신경계에도 도움이 됩니다. 균형 있는 상태나 편안함을 원할 때는 초록색을 보는 것을 추천합니다.";
    }
    else if(max == blue) {
      color_result = "파란색";
      color_explain = "차갑지만 차분한 톤으로 들끓었던 화를 가라앉혀 주는 효과를 가진 파란색은 마음을 진정시키고 인내심을 가질 수 있게 도와주는 컬러 중 하나입니다. 특히, 누군가의 호감이 필요할 때, 좋은 성과를 연결하기 위해 용기가 필요할 때, 불안감 및 불면증 해소에 도움이 됩니다. 욕망이 절제된 인상을 주며 스트레스를 줄여주기 때문입니다.";
    }
    else if(max == purple) {
      color_result = "보라색"
      color_explain = "범상치 않은 혼란의 색이라고 알려진 보라색은 부정적인 상황을 긍정적으로 치유하고 싶을 때, 우울증을 앓고 있을 때나 슬플 때 도움을 줍니다. 특히, 보라색은 뇌하수체에 영향을 주기 때문에 호르몬 활동을 통해 직접 사물에 관한 구체적인 지식을 이끄는 효능을 볼 수 있습니다. 그러므로 예술과 이론, 자극과 절제, 이성과 상상이 동시에 필요할 땐 보라색의 영향을 받는 것이 좋습니다.";
    }
    else if(max == pink) {
      color_result = "분홍색"
      color_explain = "누군가에게 기대고 싶을 때, 분홍색은 안정적인 감정을 유지할 수 있도록 따뜻하게 물들여주는 역할을 합니다. 혼란스러운 감정이거나 우울증이 있을 때 포근하고 온순한 기운을 뇌로 공급해 줍니다. 이를 통해, 교감신경계를 자극하여 신경쇠약이나 만성피로, 혼란스러울 때 감정을 추스를 수 있게 도와줍니다.";
    }

  }

  });

});


app.post('/send-msg2', (req,res) => {
  runSample(req.body.MSG).then(data => {
    res.send({Reply:data});
    const newContact = {
      request: req.body.MSG,
      response: data
    };

    var d = new Date();


    // family - father
    // =======================================

        if(req.body.MSG == '아빠' || req.body.MSG == '아버지' || req.body.MSG == '아빠요' || req.body.MSG == '아빠입니다'
              || req.body.MSG == '아버지요' || req.body.MSG == '아버지입니다') {
            first_cause = '가족';
            second_cause = '아버지';
        }

        if(data.includes('라고 한게 눈에 들어오네 그러면 아버지와 너는 어떤 관계지? (아버지와 나는 ~  식으로 작성해줘)')) {
            third_cause = req.body.MSG;
        }

        if(data.includes('그렇구나 그렇다면 대개 아버지들이란 어떤 존재일까? (대개 아버지들이란 ~ 존재다 라고 작성해줘)')) {
          forth_cause = req.body.MSG;
        }

        if(data.includes("뭔 말인지 알겠다. 그렇다면  '나는 아버지를 좋아했지만 ~ ' 이라는 문장을 완성해줄래?")) {
          fifth_cause = req.body.MSG;
        }

        if(data.includes('아버지에 대해 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
          sixth_cause = req.body.MSG;
          const newContact2 = {
            about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
            result_color: color_result,
            result_explain: color_explain,
            cause1: first_cause + " - " + second_cause,
            cause2: "검사를 한 이 친구의 주된 불안의 원인은 가족 중에서도 아버지가 가장 큰 원인이라고 할 수 있다. 아버지란 존재에 대해 물어봤을 때 '" + fifth_cause + "' 라는 생각을 보편적인 아버지라고 생각하고 있다. 하지만 자신의 아버지에 대해서 '"+ third_cause + "'라고 말한 것을 통해 자신의 아버지에 대한 생각을 알 수 있고 현재 아버지와는 '" + forth_cause + "' 라고 말한 것과  "+ sixth_cause + "을 통해 현재 상황을 알 수 있다."
          };

          db.ref('anxiety information').child('SymBmxp1asWBm1GYB3Z8uUibPsD2').push().set(newContact2); //myUid
          db.ref('anxiety information for report').child('SymBmxp1asWBm1GYB3Z8uUibPsD2').set(newContact2); //myuid

          red = 0;
          orange = 0;
          yellow = 0;
          green = 0;
          blue = 0;
          purple = 0;
          pink = 0;
          result = 0;
        }


    // family - mother
    // =======================================

      if(req.body.MSG == '엄마' || req.body.MSG == '어머니입니다' || req.body.MSG == '엄마요'
            || req.body.MSG == '어머니요' || req.body.MSG == '마더입니다') {
              first_cause = '가족';
              second_cause = '어머니';
            }
            if(data.includes('라고 한게 눈에 들어오네 그러면 어머니와 나는 어떤 관계지? (어머니와 나는 ~  식으로 작성해줘)')) {
                third_cause = req.body.MSG;
            }

            if(data.includes('그렇구나 그렇다면 대개 어머니들이란 어떤 존재일까? (대개 어머니들이란 ~ 존재다 라고 작성해줘)')) {
              forth_cause = req.body.MSG;
            }

            if(data.includes("뭔 말인지 알겠다. 그렇다면  '너는 어머니를 좋아했지만 ~ ' 이라는 문장을 완성해줄래?")) {
              fifth_cause = req.body.MSG;
            }

            if(data.includes('어머니에 대해 이야기하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
              sixth_cause = req.body.MSG;
              const newContact2 = {
                about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
                result_color: color_result,
                result_explain: color_explain,
                cause1: first_cause + " - " + second_cause,
                cause2: "검사를 한 이 친구의 주된 불안의 원인은 가족 중에서도 어머니가 가장 큰 원인이라고 할 수 있다. 어머니란 존재에 대해 물어봤을 때 '" + fifth_cause + "' 라는 생각을 보편적인 어머니라고 생각하고 있다. 하지만 자신의 어머니에 대해서 '"+ third_cause + "'라고 말한 것을 통해 자신의 어머니에 대한 생각을 알 수 있고 현재 어머니와는 '" + forth_cause + "' 라고 말한 것과  "+ sixth_cause + "을 통해 현재 상황을 알 수 있다."
              };

              df.ref('anxiety information').child('SymBmxp1asWBm1GYB3Z8uUibPsD2').push().set(newContact2); //myUid
              db.ref('anxiety information for report').child('SymBmxp1asWBm1GYB3Z8uUibPsD2').set(newContact2); //myuid

              red = 0;
              orange = 0;
              yellow = 0;
              green = 0;
              blue = 0;
              purple = 0;
              pink = 0;
              result = 0;

            }

    // brother,sister
    //=================================================
          if(req.body.MSG == '형제자매' || req.body.MSG == '형제자매요') {
            first_cause = '가족';
            second_cause = '형제 자매';
          }
          if(data.includes('라고 한게 눈에 들어오네 그러면 형제자매와 너는 어떤 관계지? (형제자매와 나는 ~  식으로 작성해줘)')) {
              third_cause = req.body.MSG;
          }

          if(data.includes('그렇구나 그렇다면 대개 형제자매들이란 어떤 존재일까? (대개 형제자매들이란 ~ 존재다 라고 작성해줘)')) {
            forth_cause = req.body.MSG;
          }

          if(data.includes("뭔 말인지 알겠다. 그렇다면  '나는 형제자매를 좋아했지만 ~ ' 이라는 문장을 완성해줄래?")) {
            fifth_cause = req.body.MSG;
          }

          if(data.includes('문장 완성형 검사는 여기까지야 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
            sixth_cause = req.body.MSG;
            const newContact2 = {
              about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
              result_color: color_result,
              result_explain: color_explain,
              cause1: first_cause + " - " + second_cause,
              cause2: "검사를 한 이 친구의 주된 불안의 원인은 가족 중에서도 형제자매가 가장 큰 원인이라고 할 수 있다. 형제자매 존재에 대해 물어봤을 때 '" + fifth_cause + "' 라는 생각을 보편적인 형제자매라고 생각하고 있다. 하지만 자신의 형제자매에 대해서 '"+ third_cause + "'라고 말한 것을 통해 자신의 형제자매에 대한 생각을 알 수 있고 현재 형제자매와는 '" + forth_cause + "' 라고 말한 것과  "+ sixth_cause + "을 통해 현재 상황을 알 수 있다."
            };
            db.ref('anxiety information').child('').push().set(newContact2); //myUid
            db.ref('anxiety information for report').child('').set(newContact2); //myuid

            red = 0;
            orange = 0;
            yellow = 0;
            green = 0;
            blue = 0;
            purple = 0;
            pink = 0;
            result = 0;
          }

      // family - family
      //=================================================

      if(req.body.MSG == '가족 자체' || req.body.MSG == '가족 자체요') {
        first_cause = '가족';
        second_cause = '가족 구성원 자체';
      }
      if(data.includes('그렇구나.. 그렇다면 너희 가족은 너에 대해서 어떻게 생각할까? (우리 가족이 나에 대해서 ~ 형식으로 작성해줘 )')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그렇군.. 그럼 너가 아는 대부분의 집안은 어떤데? (내가 아는 대부분의 집안은 ~ 형식으로 작성해줘')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes("그렇게 생각하구나! 그렇다면 너가 어렸을 때 너희 가족은 어땠어? (내가 어렸을 때 우리 가족은 ~ 형식으로 작성해줘)")) {
        fifth_cause = req.body.MSG;
      }

      if(data.includes('문장 완성형 검사는 여기까지야 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        sixth_cause = req.body.MSG;
        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 가족 자체가 가장 큰 원인이라고 할 수 있다. 가족이란 존재에 대해 물어봤을 때 '" + fifth_cause + "' 라는 생각을 보편적인 가족라고 생각하고 있다. 하지만 자신의 가족에 대해서 '"+ third_cause + "'라고 말한 것을 통해 자신의 가족에 대한 생각을 알 수 있고 현재 가족과는 '" + forth_cause + "' 라고 말한 것과  "+ sixth_cause + "을 통해 현재 상황을 알 수 있다."
        };

        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;
      }

      // sex - male
      //=================================================

      if(req.body.MSG == '남자' || req.body.MSG == '남성' || req.body.MSG == '남성이요') {
        first_cause = '성';
        second_cause = '남성';
      }
      if(data.includes('음.. 그렇군.. 그렇다면 너의 생각에 남자들이란 어떤 존재야? (내 생각에 남자들이란 ~ 이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('엄청 심오한 이야기일텐데 이야기해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;

        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '남성'이 가장 큰 원인이라고 할 수 있다. 남자란 존재에 대해서 '" + forth_cause + "' 라는 생각을 보편적으로 가지고 있다. 또한 특히 남자에 대해서 무엇보다 좋지 않게 생각하는 부분이 있는데 '"+ third_cause + "'라고 말한 것을 통해 남자에 대한 생각을 알 수 있다."
        };

        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;

      }

      // sex - female
      //=================================================

      if(req.body.MSG == '여자' || req.body.MSG == '여성' || req.body.MSG == '여성이요') {
        first_cause = '성';
        second_cause = '여성';
      }
      if(data.includes('그러면 너가 생각에 여자들이란 어떤 것 같아? (내 생각에 여자들이란 ~ 이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('네 이야기 잘 들었어! 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;

        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '여성'이 가장 큰 원인이라고 할 수 있다. 여성이란 존재에 대해서 '" + forth_cause + "' 라는 생각을 보편적으로 가지고 있다. 또한 바라는 여인상에 대해 물어봤을 때 '"+ third_cause + "'라고 말한 것을 통해 여성에 대한 생각을 알 수 있다."
        };

        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;

      }

      // sex - 이성관게 및 결혼생활
      //=================================================

      if(req.body.MSG == '이성 관계 및 결혼 생활입니다' || req.body.MSG == '이성관계 및 결혼생활' || req.body.MSG == '이성 관계 및 결혼 생활') {
        first_cause = '성';
        second_cause = '이성 관계 및 결혼 생활';
      }
      if(data.includes('그러면 좀 더 나아가서 결혼 생활에 대해 너의 생각은 어떤데?')) {
          third_cause = req.body.MSG;
      } //오류

      if(data.includes('그렇다면 너가 성교를 했다면 너는 어떨 것 같아? (내가 성교를 했다면 ~ 할 것 같다 형태로 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes('그럼 너의 성생활은 현재 어떻다고 생각해? (나의 성생활은 ~ 한 것 같아 라고 작성해줘)')) {
        fifth_cause = req.body.MSG;
      }

      if(data.includes('대답하기 힘들었을텐데 이야기해줘서 고마워!! 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        sixth_cause = req.body.MSG;

        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '이성관계 및 결혼생활'이 가장 큰 원인이라고 할 수 있다. 이성 관계를 바라볼 때 '" + third_cause + "' 라는 생각을 보편적으로 가지고 있다. 또한 결혼 생활에에 대해 물어봤을 때 '"+ forth_cause + "'라고 말한 것을 통해 결혼 생활에 대한 생각을 알 수 있다. 또한 성생활에 대한 생각 역시 알 수 있었는데 성교에 대해서 '" + fifth_cause + "' 라고 생각하고 있으며 자신의 성생활에 대해서는 '" + sixth_cause + "' 한 생각을 가지고 있음을 알 수 있었다."
        };

        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;
      }

      // other - 친구 및 대인 관계
      //=================================================

      if(req.body.MSG == '친구나 지인입니다' || req.body.MSG == '친구나 지인이요' || req.body.MSG == '친구나 지인') {
        first_cause = '대인 관계';
        second_cause = '친구 및 지인';
      }
      if(data.includes('그럼 너가 싫어하는 사람은 어떤 사람이야? (내가 싫어하는 사람은 ~한 사람이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그럼 너가 제일 좋아하는 사람은 어떤 사람이니? (내가 제일 좋아하는 사람은 ~한 사람이다 형식으로 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes('그럼 너가 없을 때 너의 친구들은 너에 대해  어떤 것을 할 것 같아? (내가 없을 때 친구들은 ~ 할 것 같다 형식으로 작성해줘)')) {
        fifth_cause = req.body.MSG;
      }

      if(data.includes('흠.. 친구나 지인에 대해 이야기하기 많이 힘들었을텐데 이야기해줘서 고마워!! 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        sixth_cause = req.body.MSG;
        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '친구 및 지인'이 가장 큰 원인이라고 할 수 있다. 가장 좋아하는 친구 및 지인은 '" + third_cause + "' 라는 생각을 보편적으로 가지고 있으며 '" + fifth_cause + "' 를 통해서는 가장 좋아하는 사람에 대해서 알 수 있었다. 또한 싫어하는 사람에 대해서도 '" + forth_cause + "'한 생각을 알 수 있었으며 자신이 없을 때 친구는 '" + sixth_cause + "'라고 말한 것을 통해 친구 및 지인에 대한 불안감을 느끼는 부분을 알 수 있었다."
        };

        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;
      }

      // other - 권위자
      //=================================================

      if(req.body.MSG == '권위자' || req.body.MSG == '권위자요' || req.body.MSG == '권위자입니다') {
        first_cause = '대인 관계';
        second_cause = '권위자';
      }
      if(data.includes('그렇구나.. 그러면 만약에 윗사람이 너에게 오는 것을 보면 너는 어떤 생각이 들어? (윗사람이 오는 것을 보면 나는 ~ 한 생각이 든다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('좋아 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '권위자 혹은 윗사람'이 가장 큰 원인이라고 할 수 있다. 평소 윗사람에 대해서는 '" + third_cause + "' 라는 생각을 보편적으로 가지고 있으며 '" + forth_cause + "' 를 통해서는 윗사람으로부터 불안해하는 모습을 볼 수 있다."
        };
        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;
      }

      // myself - guilt
      //=================================================
      if(req.body.MSG == '죄책감' || req.body.MSG == '죄책감이요' || req.body.MSG == '죄책감입니다') {
        first_cause = '자기 개념';
        second_cause = '죄책감';
      }
      if(data.includes('그렇구나... 그러면 그 일에서 너가 가장 큰 잘못을 했다고 생각하는 것은 무엇이니? (내가 저지른 가장 큰 잘못은 ~ 이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그러면 죄책감이 너를 휩싸일 때 무슨 기분이 들어? (죄책감이 나를 휩싸일 때 나는 ~ 한다 형태로 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes('너의 죄책감에 대해 이야기하기 힘들었을텐데 이야기해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        fifth_cause = req.body.MSG;
        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '죄책감'이 가장 큰 원인이라고 할 수 있다. 죄책감의 직접적인 원인으로는 '" + third_cause + "' 라고 적은 문장을 통해 죄책감을 야기한 사건을 알 수 있으며  '" + forth_cause + "' 를 통해서 죄책감의 원인에 대해서 알 수 있다. 또한 죄책감으로 인해서 발생하는 직접적인 어려움을 '" + fifth_cause + "' 을 통해서 알 수 있다. "
        };
        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;
      }

      // myself - before
      //=================================================
      if(req.body.MSG == '자신의 과거' || req.body.MSG == '내 과거' || req.body.MSG == '나의 과거'|| req.body.MSG == '과거') {
        first_cause = '자기 개념';
        second_cause = '자신의 과거';
      }
      if(data.includes('그런 일이 있었구나.. .그러면 과거의 일이 너에게 불안감을 줄 때 어떤 생각이 들어? (과거의 일로 인해 불안감에 휩싸일 때 ~ 기분이 든다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('너의 과거에 대해 이야기해줘서 고마워~ 좋아 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
      forth_cause = req.body.MSG;

      const newContact2 = {
        about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
        result_color: color_result,
        result_explain: color_explain,
        cause1: first_cause + " - " + second_cause,
        cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '자신의 과거에 대한 부정적 생각'이 가장 큰 원인이라고 할 수 있다. 자신의 과거에 대해 '" + third_cause + "' 라고 일어났던 일을 이야기하고 있으며 이 과거으로 부터 '" + forth_cause + "' 라는 문장을 통해서 직접적인 어려움에 대해서 알 수 있었다."
      };
      db.ref('anxiety information').child('').push().set(newContact2); //myUid
      db.ref('anxiety information for report').child('').set(newContact2); //myuid

      red = 0;
      orange = 0;
      yellow = 0;
      green = 0;
      blue = 0;
      purple = 0;
      pink = 0;
      result = 0;
      }

      // myself - afraid
      //=================================================
      if(req.body.MSG == '두려움이다' || req.body.MSG == '두려움이요' || req.body.MSG == '두려움이 가장 큰 것 같아'|| req.body.MSG == '두려움') {
        first_cause = '자기 개념';
        second_cause = '두려움';
      }
      if(data.includes('그렇다면 두려운 생각이 너를 휩싸일 때 너는 어떤 기분이 들어? (두려운 생각이 나를 휩싸일 때 ~ 한다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('너 안에 있는 두려움에 대해 말해줘서 고마워~ 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
      forth_cause = req.body.MSG;
      const newContact2 = {
        about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
        result_color: color_result,
        result_explain: color_explain,
        cause1: first_cause + " - " + second_cause,
        cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '두려움'이 가장 큰 원인이라고 할 수 있다. 두려움의 직접적인 원인으로는 '" +third_cause + "' 라고 적은 문장을 통해 두려움의 원인을 알 수 있으며  '" + forth_cause + "' 를 통해서는 두려움으로 인해서 발생하는 직접적인 어려움에 대해서 알 수 있다."
      };
      db.ref('anxiety information').child('').push().set(newContact2); //myUid
      db.ref('anxiety information for report').child('').set(newContact2); //myuid

      red = 0;
      orange = 0;
      yellow = 0;
      green = 0;
      blue = 0;
      purple = 0;
      pink = 0;
      result = 0;
      }

        // myself - ability
        //=================================================
        if(req.body.MSG == '자신의 능력' || req.body.MSG == '내 능력') {
          first_cause = '자기 개념';
          second_cause = '자신의 능력';
        }
        if(data.includes('그러면 너의 결점으로 인해서 불안감이 들었을 때 어떤 기분이 들어? (결점으로부터 불안감에 휩싸일 때 ~ 기분이 든다 형태로 말해줘)')) {
            third_cause = req.body.MSG;
        }

        if(data.includes('너의 능력에 대해 이야기하기 힘들었을텐데 이야기해줘서 고마워~ 좋아 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
        const newContact2 = {
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '자신의 능력에 대한 부정적 생각'이 가장 큰 원인이라고 할 수 있다. 자신의 능력에 대해 '" + snap.val().third + "' 라고 인지하고 있으며 이 결점으로 부터 '" + snap.val().forth + "' 라는 문장을 통해서 직접적인 어려움에 대해서 알 수 있었다."
        };
        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;
        }

        // myself - ability
        //=================================================
        if(req.body.MSG == '나의 미래' || req.body.MSG == '미래') {
          first_cause = '자기 개념';
          second_cause = '자신의 미래';
        }
        if(data.includes('그런 미래를 꿈꾸는 구나~ 그러면 너가 꿈꾸는 미래에 대해 자신감, 걱정 등에 대한 불안감이 들 때 어떤 기분이 들어 (내 미래에 대한 불안감에 휩싸일 때 ~ 한 기분이 든다 형태로 작성해줘)')) {
            third_cause = req.body.MSG;
        }

        if(data.includes('너의 미래에 대해 이야기하기 힘들었을텐데 이야기해줘서 고마워~ 좋아 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
        const newContact2 = {
          uid: "SymBmxp1asWBm1GYB3Z8uUibPsD2",
          about_anxiety : "현재 불안 검사를 통한 불안 점수의 합은 " + result + "점이며 상태는 '"+ type + "'이라고 할 수 있다",
          result_color: color_result,
          result_explain: color_explain,
          cause1: first_cause + " - " + second_cause,
          cause2: "검사를 한 이 친구의 주된 불안의 원인은 바로 '자신의 미래에 대한 부정적 생각'이 가장 큰 원인이라고 할 수 있다. 자신의 미래에 대해 '" + third_cause + "' 라고 일어났던 일을 이야기하고 있으며 이 미래로 부터 '" + forth_cause + "' 라는 문장을 통해서 직접적인 어려움에 대해서 알 수 있었다."
        };
        db.ref('anxiety information').child('').push().set(newContact2); //myUid
        db.ref('anxiety information for report').child('').set(newContact2); //myuid

        red = 0;
        orange = 0;
        yellow = 0;
        green = 0;
        blue = 0;
        purple = 0;
        pink = 0;
        result = 0;
        }
    //=============================================
    //=============================================
  });
});




var msg2='';
var msg1='';
app.post('/send-msg3', (req, res)=>{
    msg=req.body.MSG;
    console.log("python1: " + msg);
      app.post('/', (req2, res2)=>{
        res2.send({'user':msg});
            msg2=req2.body.msg;

    });
    setTimeout(function() {
      res.send({Reply:msg2});
    },3000);
});


app.post('/send-report', (req, res)=>{
    msg=req.body.MSG;

});

app.post('/send-msg4', (req,res) => {
  runSample(req.body.MSG).then(data => {
    res.send({Reply:data});
    const newContact = {
      request: req.body.MSG,
      response: data
    };


  });
});
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg, projectId = '') { // project name

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"" //json file position
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  return result.fulfillmentText;
}

app.listen(port, ()=>{
  console.log("running on port " + port)
});
