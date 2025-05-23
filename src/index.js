import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import db from "../src/config/db.js"
import homerouter from "./routes/home.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use("/api/home", homerouter);


app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS now");
    console.log("✅ DB 연결 성공, 현재 시간:", rows[0].now);
    res.send(`Hello World! DB 연결됨 (${rows[0].now})`);
  } catch (err) {
    console.error("❌ DB 연결 실패:", err.message);
    res.status(500).send("DB 연결 실패");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

