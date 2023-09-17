import { Router } from 'express'
import { reviewController } from '../controllers/review.controller.js'

export const reviewRoutes = () => {
    const reviewRouter = Router()
    const { createReview, deleteReview, getReviews, getReviewById, updateReview, getReviewsByMovieId } = reviewController()

    reviewRouter.route('/reviews').get(getReviews).post(createReview)

    reviewRouter.route('/reviews/:id').get(getReviewById).put(updateReview).delete(deleteReview)

    reviewRouter.route('/reviews/movie/:id').get(getReviewsByMovieId)

    return reviewRouter;
}