import Joi from "joi";

export const reviewSchema = Joi.object({
  rating: Joi.number().min(1).required(),
  content: Joi.string().max(24).required(),
});

export const reviewUpdateSchema = Joi.object({
  rating: Joi.number().min(1),
  content: Joi.string().max(24),
});

export const reviewParamsSchema = Joi.object({
  id: Joi.string().required(),
});
