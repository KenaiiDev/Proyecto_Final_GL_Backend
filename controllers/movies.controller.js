import fetch from "node-fetch";
import httpStatus from "../helpers/httpStatus.js";
import prisma from "../database/prisma.js";

export const moviesController = () => {
  const getMovies = async (req, res, next) => {
    const page = req.params.page || 1;

    const url = `${process.env.TMDB_API_URL}/discover/movie/?api_key=${process.env.TMDB_API_KEY}&page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(httpStatus.OK).json({
        success: true,
        mensaje: "Get movies",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  const getGenres = async (req, res, next) => {
    const url = `${process.env.TMDB_API_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(httpStatus.OK).json({
        success: true,
        mensaje: "Get genres",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  const getMoviesByGenres = async (req, res, next) => {
    const { genres } = req.query;
    const page = req.query.page || 1;

    const url = `${process.env.TMDB_API_URL}/discover/movie/?api_key=${process.env.TMDB_API_KEY}&with_genres=${genres}&page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(httpStatus.OK).json({
        success: true,
        mensaje: "Get movies by genres",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  const getMovieById = async (req, res, next) => {
    const { id } = req.params;

    const url = `${process.env.TMDB_API_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(httpStatus.OK).json({
        success: true,
        mensaje: "Get movie by id",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  const getMoviesByTitle = async (req, res, next) => {
    const { title } = req.query;
    const page = req.query.page || 1;

    const url = `${process.env.TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}&page=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(httpStatus.OK).json({
        success: true,
        mensaje: "Get movie by title",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  const getImageUrl = async (req, res) => {
    const { id } = req.params;

    const url = `${process.env.TMDB_IMAGE_URL}/w500/${id}`;

    res.status(httpStatus.OK).json({
      success: true,
      mensaje: "Get image",
      data: url,
    });
  };

  const toggleMovieWatchList = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { movieId } = req.body;

      const isMovieInWatchList = await prisma.Users.findUnique({
        where: {
          id: id,
          idWatchedMedia: {
            has: movieId,
          },
        },
        select: {
          idWatchedMedia: true,
        },
      });

      if (isMovieInWatchList) {
        const filteredWatchList = isMovieInWatchList.idWatchedMedia.filter(
          (movie) => movie !== movieId
        );

        const user = await prisma.Users.update({
          where: { id: id },
          data: {
            idWatchedMedia: filteredWatchList,
          },
        });

        return res.status(httpStatus.OK).json({
          success: true,
          mensaje: "Movie removed from watch later",
          data: user,
        });
      } else {
        const user = await prisma.Users.update({
          where: { id: id },
          data: {
            idWatchedMedia: {
              push: movieId,
            },
          },
        });

        res.status(httpStatus.OK).json({
          success: true,
          mensaje: "Movie added to watch list",
          data: user,
        });
      }
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const toggleMovieWatchLater = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { movieId } = req.body;

      const isMovieInWatchLater = await prisma.Users.findUnique({
        where: {
          id: id,
          watchLater: {
            has: movieId,
          },
        },
        select: {
          watchLater: true,
        },
      });

      if (isMovieInWatchLater) {
        const filteredWatchLater = isMovieInWatchLater.watchLater.filter(
          (movie) => movie !== movieId
        );

        const user = await prisma.Users.update({
          where: { id: id },
          data: {
            watchLater: filteredWatchLater,
          },
        });

        return res.status(httpStatus.OK).json({
          success: true,
          mensaje: "Movie removed from watch later",
          data: user,
        });
      } else {
        const user = await prisma.Users.update({
          where: { id: id },
          data: {
            watchLater: {
              push: movieId,
            },
          },
        });

        res.status(httpStatus.OK).json({
          success: true,
          mensaje: "Movie added to watch list",
          data: user,
        });
      }
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    getMovies,
    getGenres,
    getMoviesByGenres,
    getMovieById,
    getMoviesByTitle,
    getImageUrl,
    toggleMovieWatchList,
    toggleMovieWatchLater,
  };
};
