import { incrementLikeCount } from "../repositories/movie.repository.js";
import db from "../db.config.js";

export const likeMovieService = async (movieId) => {
  return await incrementLikeCount(movieId);
};

export const fetchMovieById = async (movieId) => {
  const [rows] = await db.query(
    `SELECT 
      movie_id AS movieId,
      moviename,
      releasedate AS releaseDate,
      age,
      time,
      content,
      director,
      score,
      actor,
      poster_url AS movieImage
    FROM Movie
    WHERE movie_id = ?`,
    [movieId]
  );

  return {
    movieId,
    totalReviews: rows.length,
    page: 1,
    size: 10,
    reviews: rows,
  };
};
export const fetchMovieReviews = async (movieId) => {
  const [rows] = await db.query(
    `
  SELECT 
    r.review_id AS reviewId,
    r.user_id AS userId,
    u.nickname,
    r.rating,
    r.content,
    r.created_at
  FROM Review r
  JOIN User u ON r.user_id = u.id
  WHERE r.movie_id = ?
  ORDER BY r.created_at DESC
  `,
    [movieId]
  );

  return rows;
};
