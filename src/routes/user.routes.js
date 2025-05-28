import express from "express";
import {
  handleGetUserInfo,
  handleGetUserReviews,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users/:userId", handleGetUserInfo);

router.get("/users/:userId/reviews", handleGetUserReviews);

export default router;
