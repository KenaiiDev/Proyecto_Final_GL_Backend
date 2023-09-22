import httpStatus from "../helpers/httpStatus.js";
import prisma from "../database/prisma.js";

export const reviewController = () => {
  // New Review
  const createReview = async (req, res, next) => {
    try {
      const { rating, content, movieId, userId } = req.body;

      //check if user already reviewed this movie
      const reviewExists = await prisma.Reviews.findFirst({
        where: {
          authorId: userId,
          movieId,
        },
      });

      if (reviewExists) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: "You already reviewed this movie",
        });
      }

      const review = await prisma.Reviews.create({
        data: {
          rating,
          content,
          movieId,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });

      res.status(httpStatus.CREATED).json({
        success: true,
        message: "Review created successfully",
        data: review,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  // Delete Review
  const deleteReview = async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedReview = await prisma.Reviews.delete({
        where: {
          id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Review deleted successfully",
        data: deletedReview,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  // Get all existing reviews
  const getReviews = async (req, res, next) => {
    try {
      const reviews = await prisma.Reviews.findMany();

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get existing reviews",
        data: reviews,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  // Get Review by ID
  const getReviewById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const review = await prisma.Reviews.findUnique({
        where: {
          id,
        },
        include: {
          author: {
            select: {
              username: true,
              name: true,
            },
          },
        },
      });

      const movieId = review.movieId;
      const url = `${process.env.API_URL}/movie/${movieId}`;

      const movieRes = await fetch(url);
      const movie = await movieRes.json();

      review.movie = movie.data;

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get review by id",
        data: review,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  // Get Review by Movie ID
  const getReviewsByMovieId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const movieReviews = await prisma.Reviews.findMany({
        where: {
          movieId: id,
        },
        include: {
          author: {
            select: {
              username: true,
              name: true,
            },
          },
        },
      });

      const url = `${process.env.API_URL}/movie/${id}`;

      const movieRes = await fetch(url);
      const movie = await movieRes.json();

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get reviews by movie ID",
        data: { movieReviews, movie: movie.data },
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getReviewByUserId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const reviews = await prisma.Reviews.findMany({
        where: {
          authorId: id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get reviews",
        data: reviews,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  // Update Review
  const updateReview = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rating, content } = req.body;

      const updatedReview = await prisma.Reviews.update({
        where: {
          id,
        },

        data: {
          rating,
          content,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Review updated successfully",
        data: updatedReview,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createReview,
    deleteReview,
    getReviews,
    getReviewById,
    updateReview,
    getReviewsByMovieId,
    getReviewByUserId,
  };
};
