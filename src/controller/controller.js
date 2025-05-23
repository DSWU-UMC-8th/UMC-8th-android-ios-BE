import { writeReview } from '../service/service.js';

export const postReview = async (req, res) => {
  try {
    const { movie_id, rating, content, spoiler, point_ids } = req.body;

    // 로그인 없이 테스트하므로 user_id 직접 하드코딩
    const user_id = 1; // ← DB에 실제로 존재하는 사용자 ID로 설정

    const reviewId = await writeReview(user_id, movie_id, rating, content, spoiler, point_ids);
    res.status(201).json({ message: '리뷰 등록 완료', review_id: reviewId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};
