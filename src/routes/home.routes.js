import express from "express";
import { getNowPlayingMovies, getRecommendedMovies, getTopRatedMovies } from "../controllers/home.controller.js";


const router = express.Router();

router.get("/movies/recommended", getRecommendedMovies);
router.get("/movies/now-playing", getNowPlayingMovies);
router.get("/movies/top-rated", getTopRatedMovies);

export default router;
