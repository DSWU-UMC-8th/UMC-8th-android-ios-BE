import db from "../config/db.js";

export const getUserById = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
      id AS userId,
      username,
      email,
      nickname
    FROM User
    WHERE id = ?`,
    [userId]
  );

  return rows[0];
};

export const getUserReviewsById = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
      r.review_id AS reviewId,
      r.movie_id AS movieId,
      m.moviename AS movieTitle,
      m.poster_url AS movieImage,
      r.rating,
      r.content,
      r.created_at
    FROM Review r
    JOIN Movie m ON r.movie_id = m.movie_id
    WHERE r.user_id = ?
    ORDER BY r.created_at DESC`,
    [userId]
  );

  return rows;
};
