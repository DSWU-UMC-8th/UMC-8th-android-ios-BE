import { insertReview, insertReviewPoints } from '../repository/repository.js';

export const writeReview = async (userId, movieId, rating, content, spoiler, pointIds) => {
  const { conn, reviewId } = await insertReview(userId, movieId, rating, content, spoiler);
  await insertReviewPoints(conn, reviewId, userId, movieId, pointIds);
  return reviewId;
};