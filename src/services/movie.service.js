import db from "../db.config.js";

export const incrementLikeCount = async (movieId) => {
  await db.query("UPDATE Movie SET likes = likes + 1 WHERE movie_id = ?", [
    movieId,
  ]);
  const [rows] = await db.query("SELECT likes FROM Movie WHERE movie_id = ?", [
    movieId,
  ]);
  return { likes: rows[0].likes };
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
