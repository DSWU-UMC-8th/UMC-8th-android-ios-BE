import db from "../db.config.js";

export const fetchMovieById = async (movieId) => {
  const [rows] = await db.query("SELECT * FROM Movie WHERE movie_id = ?", [
    movieId,
  ]);
  return rows[0];
};

export const incrementLikeCount = async (movieId) => {
  await db.query("UPDATE Movie SET likes = likes + 1 WHERE movie_id = ?", [
    movieId,
  ]);
  const [rows] = await db.query("SELECT likes FROM Movie WHERE movie_id = ?", [
    movieId,
  ]);
  return { likes: rows[0].likes };
};

export const fetchMovieReviews = async (movieId) => {
  const [rows] = await db.query(
    `
    SELECT Review.review_id, Review.content, Review.rating, Review.created_at,
           Review.spoiler, Review.emotion_tag AS point, User.nickname
    FROM Review
    JOIN User ON Review.id = User.id
    WHERE Review.movie_id = ?
    ORDER BY Review.created_at DESC
  `,
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
