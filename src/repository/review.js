import express from 'express';
import { postReview } from '../controller/controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', postReview);

export default router;