// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 필수 정보 누락 시 예외 처리
    if (!decoded.id) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다. 사용자 ID가 없습니다." });
    }

    req.user = {
      id: decoded.id,
      username: decoded.username || null
    };

    next();
  } catch (err) {
    console.error("JWT 검증 오류:", err.message);
    return res.status(401).json({ message: "토큰 검증 실패: " + err.message });
  }
};
