import fetch from "node-fetch";
import httpStatus from "../helpers/httpStatus.js";

export const moviesController = () => {
  const getMovies = async (req, res, next) => {
    const page = req.params.page || 1;

    //get the Today's date in the format YYYY-MM-DD
    const todayDate = new Date().toISOString().slice(0, 10);
    console.log(todayDate);

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
    console.log("getMoviesByGenres");
    const { genres } = req.query;
    const page = req.params.page || 1;

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
    const page = req.params.page || 1;

    const url = `${process.env.TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}&page=${page}`;

    console.log(url);

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

  const getImageUrl = async (req, res, next) => {
    const { id } = req.params;

    const url = `${process.env.TMDB_IMAGE_URL}/w500/${id}`;

    res.status(httpStatus.OK).json({
      success: true,
      mensaje: "Get image",
      data: url,
    });
  };

  return {
    getMovies,
    getGenres,
    getMoviesByGenres,
    getMovieById,
    getMoviesByTitle,
    getImageUrl,
  };
};
