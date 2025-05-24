import { fetchRecommendedMovies } from "../services/home.service.js";
import { fetchNowPlayingMovies } from "../services/home.service.js";
import { fetchTopRatedMovies } from "../services/home.service.js";

export const getRecommendedMovies = async (req, res) => {
  try {
    const movies = await fetchRecommendedMovies();
    res.status(200).json({
      isSuccess: true,
      code: 200,
      message: "오늘의 추천 영화 조회에 성공했습니다.",
      result: movies,
    });
  } catch (err) {
    console.error("🔥 추천 영화 컨트롤러 에러:", err);
    res.status(500).json({
      isSuccess: false,
      code: 500,
      message: "오늘의 추천 영화 조회에 실패했습니다.",
    });
  }
};

export const getNowPlayingMovies = async (req, res) => {
    console.log("🎬 [controller] now-playing 요청 들어옴");
    try {
      const movies = await fetchNowPlayingMovies();
      console.log("✅ [controller] 서비스에서 받아온 결과:", movies);

      res.status(200).json({
        isSuccess: true,
        code: 200,
        message: "현재 상영중인 영화 조회에 성공했습니다.",
        result: movies
      });
    } catch (err) {
      console.error("🔥 현재 상영중인 영화 에러:", err);
      res.status(500).json({
        isSuccess: false,
        code: 500,
        message: "현재 상영중인 영화 조회에 실패했습니다.",
      });
    }
  };

  export const getTopRatedMovies = async (req, res) => {
    try {
      const movies = await fetchTopRatedMovies();
      res.status(200).json({
        isSuccess: true,
        code: 200,
        message: "리뷰가 좋은 영화 조회에 성공했습니다.",
        result: movies
      });
    } catch (err) {
      console.error("🔥 리뷰가 좋은 영화 조회 실패:", err);
      res.status(500).json({
        isSuccess: false,
        code: 500,
        message: "리뷰가 좋은 영화 조회에 실패했습니다.",
      });
    }
  };
