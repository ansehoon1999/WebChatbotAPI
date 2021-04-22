# 🌻WEB Dialogflow & KoGPT-2 API🌻


<img src="https://img.shields.io/badge/platform-dialogflow-orange"> <img src="https://img.shields.io/badge/platform-nodejs-brightgreen"> <img src="https://img.shields.io/badge/platform-firebase-blue"> 

> Dialogflow와 web nodejs 연동법

> KoGPT-2와 web nodejs 연동법

## Summary

![final](https://user-images.githubusercontent.com/63048392/115654781-cf9e8500-a36c-11eb-96b6-550dc4d99f2e.png)

이 안드로이드 어플리케이션은 불안 장애를 막기 위해 개발된 웹 기반 API입니다. 
불안 정도 검사, 불안 원인 검사, 딥러닝 기반 챗봇과의 자유로운 대화를 통해 불안한 감정을 확인하고 치유할 수 있습니다.

## requirement

1.	Dialog flow를 통해 정해진 질의 응답을 작성 (WIKI 참조)
2.	Dialog flow API를 사용하기 위해서 Google Cloud Platform에서 해당 Dialogflow project 찾은 후에 인증 키 발급 (https://github.com/googleapis/nodejs-dialogflow 참조)
3.	Json 파일 발급 후 public 파일 안에 넣어줍니다. (Chatbot 파일과 같은 위치에)
4.  라이브러리 설치 (해당 디렉토리(Chatbot) 경로 변경 후 설치) 
  
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
1. 아래 해당 주석 위치에 내용 추가

```c
var serviceAccount = require("") // firebase json file position
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "" // firebase database url
});

```

2. child 내부에 자신의 firebase uid 추가
```c
  db.ref('anxiety information').child('').push().set(newContact2); //myUid
  db.ref('anxiety information for report').child('').set(newContact2); //myuid
```

3. 아래 function의 주석 위치에 정보 추가
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



## Dialogflow Web Chatbot 실행 방법
1. cmd에서 chatbot.js가 있는 디렉토리로 이동
2. 다음과 같은 명령어 실행
```c
  node chatbot api.js
```
3. first_counsel.html / second_html 에 들어가서 원하는 말을 적는다
4. 이후에 rule된 chatbot 대답을 확인할 수 있다.

## KoGPT2 Web Chatbot 실행 방법 
(KoGPT2 training 방법 https://github.com/haven-jeon/KoGPT2-chatbot 참조)
1. answering.py 실행
2. nodejs의 local 서버 실행
3. deep_counsel.html에 원하는 말을 적는다.
4. 일정 시간 후에 딥러닝 Chatbot의 대답을 확인할 할 수 있음

※ 데이터 셋 종류
- AI Hub(https://aihub.or.kr/) 웰니스 대화 데이터 셋  
- ChatbotData(https://github.com/songys/Chatbot_data) 대화 데이터 셋
- AI Hub(https://aihub.or.kr/) 감성 말뭉치 데이터 셋 (전처리) 

![캡처](https://user-images.githubusercontent.com/63048392/114212934-5af73e00-999d-11eb-862e-5a7824e90d25.PNG)
