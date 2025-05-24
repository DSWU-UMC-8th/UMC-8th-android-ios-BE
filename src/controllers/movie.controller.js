import {
  fetchMovieById,
  //incrementLikeCount,
  //fetchMovieReviews,
} from "../services/movie.service.js";

export const getMovieDetail = async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  const movie = await fetchMovieById(movieId); //db에서 영화 하나 찾아서 사용

  res.status(200).json({
    isSuccess: true,
    code: 200,
    message: "영화 정보 조회 성공",
    result: movie,
  });
};

export const likeMovie = async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  const updated = await incrementLikeCount(movieId);

  res.status(200).json({
    isSuccess: true,
    code: 200,
    message: "영화 추천 성공",
    result: {
      movieId,
      likes: updated.likes,
    },
  });
};

export const getMovieReviews = async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  const reviews = await fetchMovieReviews(movieId); //db에서 리뷰 가져오기

  res.status(200).json({
    isSuccess: true,
    code: 200,
    message: "영화 리뷰 목록 조회 성공",
    result: reviews,
  });
};
