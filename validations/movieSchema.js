import Joi from "joi";

export const watchListSchema = Joi.object({
  movieId: Joi.string().required(),
});

export const watchLaterSchema = Joi.object({
  movieId: Joi.string().required(),
});
