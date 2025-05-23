import {handleRegister, handleLogin} from './controller/controller.js';


import dotenv from "dotenv";
import express from "express";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post('/api/register', handleRegister); // 회원가입
app.post('/api/login', handleLogin); // 로그인
