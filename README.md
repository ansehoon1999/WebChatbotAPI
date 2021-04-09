# 🌻WEB Dialogflow & KoGPT-2 API🌻


<img src="https://img.shields.io/badge/platform-dialogflow-orange"> <img src="https://img.shields.io/badge/platform-nodejs-brightgreen"> 

> Dialogflow와 web nodejs 연동법

> KoGPT-2와 web nodejs 연동법

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


