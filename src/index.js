import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import db from "../src/config/db.js";
import homerouter from "./routes/home.routes.js";
import {
  handleRegister,
  handleLogin,
  handleCheckId,
} from "./controller/controller.js";
import movieRoutes from "./routes/movie.routes.js";

import reviewRouter from "./routes/review.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use("/api/home", homerouter);

app.use('/api/reviews', reviewRouter);


app.use("/api", movieRoutes);

app.use("/api", userRouter);

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

app.post("/api/register", handleRegister); // 회원가입
app.post("/api/login", handleLogin); // 로그인
app.get("/api/check-id", handleCheckId); // 아이디 중복 확인

app.listen(port, "0.0.0.0", () => {
  console.log(`listening on port ${port}`);
});
