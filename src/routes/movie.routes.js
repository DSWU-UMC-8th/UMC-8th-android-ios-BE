import express from "express";
import {
  getMovieDetail,
  likeMovie,
  getMovieReviews,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/movies/:movieId", getMovieDetail);
router.post("/movies/:movieId/like", likeMovie);
router.get("/movies/:movieId/reviews", getMovieReviews);

export default router;
