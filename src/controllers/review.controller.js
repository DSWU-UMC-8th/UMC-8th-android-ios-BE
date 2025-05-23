import { writeReview } from "../service/service.js";

export const postReview = async (req, res) => {
  try {
    const userId = req.user.id; // ← JWT 미들웨어 통과한 유저 ID

    const { movie_id, rating, content, spoiler, point_ids } = req.body;

    // 유효성 검사 (간단하게 예시)
    if (!movie_id || !rating || !content || point_ids?.length === 0) {
      return res.status(400).json({ message: "입력값이 부족합니다." });
    }

    const reviewId = await writeReview(userId, movie_id, rating, content, spoiler, point_ids);

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
