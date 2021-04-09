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
  npm init: package name에 원하는 이름을 적는다
```
```c
  npm I dialogflow
```
```c
  npm install uuid express body-parser
```

