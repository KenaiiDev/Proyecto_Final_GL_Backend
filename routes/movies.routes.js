import { Router } from "express";
import { moviesController } from "../controllers/movies.controller.js";

export const moviesRoutes = () => {
  const moviesRouter = Router();
  const {
    getMovies,
    getGenres,
    getMoviesByGenres,
    getMovieById,
    getMoviesByTitle,
    getImageUrl,
  } = moviesController();

  moviesRouter.route("/movies/").get(getMovies);
  moviesRouter.route("/genres").get(getGenres);

  moviesRouter.route("/movies/genres/").get(getMoviesByGenres);
  moviesRouter.route("/movies/genres/:page").post(getMoviesByGenres);

  moviesRouter.route("/movies/search/").get(getMoviesByTitle);
  moviesRouter.route("/movies/search/:page").get(getMoviesByTitle);

  moviesRouter.route("/movies/:page").get(getMovies);
  moviesRouter.route("/movie/:id").get(getMovieById);

  moviesRouter.route("/image/:id").get(getImageUrl);

  return moviesRouter;
};
