# ๐ปWEB Dialogflow & KoGPT-2 API๐ป


<img src="https://img.shields.io/badge/platform-dialogflow-orange"> <img src="https://img.shields.io/badge/platform-nodejs-brightgreen"> <img src="https://img.shields.io/badge/platform-firebase-blue"> 

> Dialogflow์ web nodejs ์ฐ๋๋ฒ

> KoGPT-2์ web nodejs ์ฐ๋๋ฒ

## Summary

![final](https://user-images.githubusercontent.com/63048392/115654781-cf9e8500-a36c-11eb-96b6-550dc4d99f2e.png)

์ด ํ ๋ฅํ ๋ฅ ํ๋ก์ ํธ๋ ๋ถ์ ์ฅ์ ๋ฅผ ๋ง๊ธฐ ์ํด ๊ฐ๋ฐ๋ ์น ๊ธฐ๋ฐ API์๋๋ค. 
๋ถ์ ์ ๋ ๊ฒ์ฌ, ๋ถ์ ์์ธ ๊ฒ์ฌ, ๋ฅ๋ฌ๋ ๊ธฐ๋ฐ ์ฑ๋ด๊ณผ์ ์์ ๋ก์ด ๋ํ๋ฅผ ํตํด ๋ถ์ํ ๊ฐ์ ์ ํ์ธํ๊ณ  ์น์ ํ  ์ ์์ต๋๋ค.



## Demo App

![์บก์ฒ](https://user-images.githubusercontent.com/63048392/114212934-5af73e00-999d-11eb-862e-5a7824e90d25.PNG)


## requirement

1.	Dialog flow๋ฅผ ํตํด ์ ํด์ง ์ง์ ์๋ต์ ์์ฑ (WIKI ์ฐธ์กฐ)
2.	Dialog flow API๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์ Google Cloud Platform์์ ํด๋น Dialogflow project ์ฐพ์ ํ์ ์ธ์ฆ ํค ๋ฐ๊ธ (https://github.com/googleapis/nodejs-dialogflow ์ฐธ์กฐ)
3.	Json ํ์ผ ๋ฐ๊ธ ํ public ํ์ผ ์์ ๋ฃ์ด์ค๋๋ค. (Chatbot ํ์ผ๊ณผ ๊ฐ์ ์์น์)
4.  ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น (ํด๋น ๋๋ ํ ๋ฆฌ(Chatbot) ๊ฒฝ๋ก ๋ณ๊ฒฝ ํ ์ค์น) 
  
```c
  npm init
```
```c
  npm I dialogflow
```
```c
  npm install uuid express body-parser
```



## chatbot api.js
1. ์๋ ํด๋น ์ฃผ์ ์์น์ ๋ด์ฉ ์ถ๊ฐ

```c
var serviceAccount = require("") // firebase json file position
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "" // firebase database url
});

```

2. child ๋ด๋ถ์ ์์ ์ firebase uid ์ถ๊ฐ
```c
  db.ref('anxiety information').child('').push().set(newContact2); //myUid
  db.ref('anxiety information for report').child('').set(newContact2); //myuid
```

3. ์๋ function์ ์ฃผ์ ์์น์ ์ ๋ณด ์ถ๊ฐ
```c
async function runSample(msg, projectId = '') { // project name
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"" //json file position
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: msg,
        languageCode: 'en-US',
      },
    },
  };
```



## Dialogflow Web Chatbot ์คํ ๋ฐฉ๋ฒ
1. cmd์์ chatbot.js๊ฐ ์๋ ๋๋ ํ ๋ฆฌ๋ก ์ด๋
2. ๋ค์๊ณผ ๊ฐ์ ๋ช๋ น์ด ์คํ
```c
  node chatbot api.js
```
3. first_counsel.html / second_html ์ ๋ค์ด๊ฐ์ ์ํ๋ ๋ง์ ์ ๋๋ค
4. ์ดํ์ rule๋ chatbot ๋๋ต์ ํ์ธํ  ์ ์๋ค.

## KoGPT2 Web Chatbot ์คํ ๋ฐฉ๋ฒ 
(KoGPT2 training ๋ฐฉ๋ฒ https://github.com/haven-jeon/KoGPT2-chatbot ์ฐธ์กฐ)
1. answering.py ์คํ
2. nodejs์ local ์๋ฒ ์คํ
3. deep_counsel.html์ ์ํ๋ ๋ง์ ์ ๋๋ค.
4. ์ผ์  ์๊ฐ ํ์ ๋ฅ๋ฌ๋ Chatbot์ ๋๋ต์ ํ์ธํ  ํ  ์ ์์

โป ๋ฐ์ดํฐ ์ ์ข๋ฅ
- AI Hub(https://aihub.or.kr/) ์ฐ๋์ค ๋ํ ๋ฐ์ดํฐ ์  
- ChatbotData(https://github.com/songys/Chatbot_data) ๋ํ ๋ฐ์ดํฐ ์
- AI Hub(https://aihub.or.kr/) ๊ฐ์ฑ ๋ง๋ญ์น ๋ฐ์ดํฐ ์ (์ ์ฒ๋ฆฌ) 

