import { Router } from "express";
import { moviesController } from "../controllers/movies.controller.js";

import { authUsers } from "../middlewares/authUsers.js";

import {
  watchLaterValidation,
  watchListValidation,
} from "../middlewares/validations.js";

export const moviesRoutes = () => {
  const moviesRouter = Router();
  const {
    getMovies,
    getGenres,
    getMoviesByGenres,
    getMovieById,
    getMoviesByTitle,
    getImageUrl,
    toggleMovieWatchList,
    toggleMovieWatchLater,
  } = moviesController();

  moviesRouter.route("/movies/").get(getMovies);
  moviesRouter.route("/genres").get(getGenres);

  moviesRouter.route("/movies/genres/").get(getMoviesByGenres);

  moviesRouter.route("/movies/search/").get(getMoviesByTitle);

  moviesRouter
    .route("/movie/add/watchlist/:id")
    .post(authUsers, watchLaterValidation, toggleMovieWatchList);
  moviesRouter
    .route("/movie/add/watchlater/:id")
    .post(authUsers, watchListValidation, toggleMovieWatchLater);

  moviesRouter.route("/movies/:page").get(getMovies);
  moviesRouter.route("/movie/:id").get(getMovieById);

  moviesRouter.route("/image/:id").get(getImageUrl);

  return moviesRouter;
};
