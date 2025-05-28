import { getUserById, getUserReviewsById } from "../services/user.service.js";

export const handleGetUserInfo = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        code: 404,
        message: "해당 유저가 존재하지 않습니다.",
      });
    }

    res.status(200).json({
      isSuccess: true,
      code: 200,
      message: "유저 정보 조회 성공",
      result: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleGetUserReviews = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const reviews = await getUserReviewsById(userId);

    res.status(200).json({
      isSuccess: true,
      code: 200,
      message: "내가 쓴 리뷰 목록 조회 성공",
      result: reviews,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
