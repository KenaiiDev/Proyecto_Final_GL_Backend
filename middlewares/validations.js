import {
  userBodySchema,
  userUpdateSchema,
  loginSchema,
  userParamsSchema,
} from "../validations/userSchema.js";

import {
  reviewSchema,
  reviewParamsSchema,
  reviewUpdateSchema,
} from "../validations/reviewSchema.js";

import {
  watchLaterSchema,
  watchListSchema,
} from "../validations/movieSchema.js";

export const userCreateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = userBodySchema.validate(data);

  error ? next(error) : next();
};

export const userLoginValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = loginSchema.validate(data);

  error ? next(error) : next();
};

export const userUpdateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = userUpdateSchema.validate(data);

  error ? next(error) : next();
};

export const userParamsValidation = (req, _res, next) => {
  const data = req.params;
  const { error } = userParamsSchema.validate(data);

  error ? next(error) : next();
};

export const reviewUpdateValidation = (req, _res, next) => {
  const data = req.params;
  const { error } = reviewUpdateSchema.validate(data);

  error ? next(error) : next();
};

export const reviewCreateValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = reviewSchema.validate(data);

  error ? next(error) : next();
};

export const reviewParamsValidation = (req, _res, next) => {
  const data = req.params;
  const { error } = reviewParamsSchema.validate(data);

  error ? next(error) : next();
};

export const watchLaterValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = watchLaterSchema.validate(data);

  error ? next(error) : next();
};

export const watchListValidation = (req, _res, next) => {
  const data = req.body;
  const { error } = watchListSchema.validate(data);

  error ? next(error) : next();
};
