import pool from '/db.config.js';

export const insertReview = async (userId, movieId, rating, content, spoiler) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO Review (id, movie_id, rating, content, spoiler, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [userId, movieId, rating, content, spoiler]
    );

    const reviewId = result.insertId;
    return { conn, reviewId };
  } catch (err) {
    conn.release();
    throw err;
  }
};

export const insertReviewPoints = async (conn, reviewId, userId, movieId, pointIds) => {
  for (const pointId of pointIds) {
    await conn.query(
      `INSERT INTO Review_Point (review_id, id, movie_id, point_id)
       VALUES (?, ?, ?, ?)`,
      [reviewId, userId, movieId, pointId]
    );
  }

  await conn.commit();
  conn.release();
};
