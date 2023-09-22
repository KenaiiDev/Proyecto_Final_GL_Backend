import Joi from "joi";

export const userBodySchema = Joi.object({
  username: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(4).required(),
  birthdate: Joi.date().required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().max(20),
  email: Joi.string().email(),
  name: Joi.string(),
  password: Joi.string().min(4),
  birthdate: Joi.date(),
  oldPassword: Joi.string().min(4),
  newPassword: Joi.string().min(4),
});

export const loginSchema = Joi.object({
  username: Joi.string().max(20).required(),
  password: Joi.string().min(4).required(),
});

export const userParamsSchema = Joi.object({
  id: Joi.string().required(),
});
