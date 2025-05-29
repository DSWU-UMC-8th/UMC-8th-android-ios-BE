// src/routes/review.routes.js
import express from 'express';
import { postReview } from '../controllers/review.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  [
    body('movie_id').isInt(),
    body('rating').isInt({ min: 1, max: 10 }),
    body('content').isLength({ max: 100 }),
    body('spoiler').isBoolean(),
    body('feeling_tags').isArray()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  postReview // 💡 핵심 로직은 controller로 위임
);

export default router;
