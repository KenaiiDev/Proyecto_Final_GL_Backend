import { Router } from "express";
import { reviewController } from "../controllers/review.controller.js";

import { authReviews, authCreateReview } from "../middlewares/authReviews.js";

export const reviewRoutes = () => {
  const reviewRouter = Router();
  const {
    createReview,
    deleteReview,
    getReviews,
    getReviewById,
    updateReview,
    getReviewsByMovieId,
    getReviewByUserId,
  } = reviewController();

  reviewRouter
    .route("/reviews")
    .get(getReviews)
    .post(authCreateReview, createReview);

  reviewRouter
    .route("/reviews/:id")
    .get(getReviewById)
    .put(authReviews, updateReview)
    .delete(authReviews, deleteReview);

  reviewRouter.route("/reviews/movie/:id").get(getReviewsByMovieId);

  reviewRouter.route("/reviews/user/:id").get(getReviewByUserId);

  return reviewRouter;
};
