import express from 'express';
import pool from '../db.config.js';
import { body, validationResult } from 'express-validator';
// import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/',
  // authMiddleware,
  [
    body('movie_id').isInt(),
    body('rating').isInt({ min: 1, max: 10 }),
    body('content').isLength({ max: 100 }),
    body('spoiler').isBoolean(),
    body('feeling_tags').isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { movie_id, rating, content, spoiler, feeling_tags } = req.body;
    const user_id = 1; // 테스트용

    const client = await pool.getConnection();
    try {
      await client.beginTransaction();

      const [result] = await client.query(
        `INSERT INTO Review (user_id, movie_id, rating, content, is_spoiler, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [user_id, movie_id, rating, content, spoiler]
      );
      const review_id = result.insertId;

      for (const tag of feeling_tags) {
        await client.query(
          `INSERT INTO Review_Point (review_id, id, movie_id, point_id)
           VALUES (?, ?, ?, ?)`,
          [review_id, user_id, movie_id, tag]
        );
      }

      await client.commit();
      res.status(201).json({ message: '리뷰 등록 완료', review_id });
    } catch (err) {
      await client.rollback();
      console.error(err);
      res.status(500).json({ message: '서버 오류', error: err.message });
    } finally {
      client.release();
    }
  }
);

export default router;
