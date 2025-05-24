import db from "../config/db.js";

export const getRecentlyLikedMovies = async () => {
  const [rows] = await db.query(`
    SELECT 
      m.movie_id AS movieId,
      m.moviename AS title,
      m.poster_url AS posterUrl
    FROM Movie m
    JOIN Movie_Evaluation e ON m.movie_id = e.movie_id
    WHERE e.evaluation = 'like'
    GROUP BY m.movie_id
    ORDER BY MAX(e.created_at) DESC
    LIMIT 10
  `);
  return rows;
};

export const getNowPlayingMovies = async () => {
    console.log("📦 [repo] getNowPlayingMovies 쿼리 실행");
    const [rows] = await db.query(`
      SELECT movie_id AS movieId, moviename AS title, poster_url AS posterUrl
      FROM Movie
      WHERE releasedate >= CURDATE() - INTERVAL 30 DAY
        AND releasedate <= CURDATE()
      ORDER BY releasedate DESC
      LIMIT 10
    `);
    console.log("📦 [repo] 쿼리 결과:", rows);
    return rows;
  };
  
  export const getTopRatedMovies = async () => {
    const [rows] = await db.query(`
      SELECT 
        m.movie_id AS movieId,
        m.moviename AS title,
        m.poster_url AS posterUrl,
        ROUND(AVG(r.rating), 1) AS score
      FROM Movie m
      JOIN Review r ON m.movie_id = r.movie_id
      GROUP BY m.movie_id
      ORDER BY score DESC
      LIMIT 10
    `);
    return rows;
  };
  