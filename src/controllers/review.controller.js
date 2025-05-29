// src/controller/review.controller.js
import { writeReview } from "../service/service.js";

export const postReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movie_id, rating, content, spoiler, feeling_tags } = req.body;

    if (!movie_id || !rating || !content || !Array.isArray(feeling_tags) || feeling_tags.length === 0) {
      return res.status(400).json({ message: "입력값이 부족합니다." });
    }

    const reviewId = await writeReview(userId, movie_id, rating, content, spoiler, feeling_tags);

    res.status(201).json({
      message: "리뷰 등록 완료",
      review_id: reviewId,
    });
  } catch (err) {
    console.error("리뷰 등록 실패:", err);
    res.status(500).json({
      message: "서버 오류",
      error: err.message,
    });
  }
};
