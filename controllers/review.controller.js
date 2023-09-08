import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'

export const reviewController = () => {
  // New Review
  const createReview = async (req, res, next) => {
    try {
      const { rating, content, movieId } = req.body

      const review = await prisma.Reviews.create({
        data: {
          rating,
          content,
          movieId
        }
      })

      res.status(httpStatus.CREATED).json({
        success: true,
        message: 'Review created successfully',
        data: review
      })
    } catch (error) {
      next()
    } finally {
      await prisma.$disconnect()
    }
  }

  // Delete Review
  const deleteReview = async (req, res, next) => {
    const { id } = req.params

    try {
      const deletedReview = await prisma.Reviews.delete({
        where: {
          id
        }
      })

      res.status(httpStatus.OK).json({
        success: true,
        message: 'Review deleted successfully',
        data: deletedReview
      })
    } catch (error) {
      next()
    } finally {
      await prisma.$disconnect()
    }
  }

  // Get all existing reviews
  const getReviews = async (req, res, next) => {
    try {
      const reviews = await prisma.Reviews.findMany()

      res.status(httpStatus.OK).json({
        success: true,
        message: 'Get existing reviews',
        data: reviews
      })
    } catch (error) {
      next()
    } finally {
      await prisma.$disconnect()
    }
  }

  // Get Review by ID
  const getReviewById = async (req, res, next) => {
    const { id } = req.params
    try {
      const review = await prisma.Reviews.findUnique({
        where: {
          id
        }
      })

      res.status(httpStatus.OK).json({
        success: true,
        message: 'Get user by id',
        data: review
      })
    } catch (error) {
      next()
    } finally {
      await prisma.$disconnect()
    }
  }

  // Update Review
  const updateReview = async (req, res, next) => {
    try {
      const { id } = req.params
      const { rating, content } = req.body

      const updatedReview = await prisma.Review.update({
        where: {
          id
        },

        data: {
          rating,
          content
        }
      })

      res.status(httpStatus.OK).json({
        success: true,
        message: 'Review updated successfully',
        data: updatedReview
      })
    } catch (error) {
      next()
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createReview,
    deleteReview,
    getReviews,
    getReviewById,
    updateReview
  }
}
