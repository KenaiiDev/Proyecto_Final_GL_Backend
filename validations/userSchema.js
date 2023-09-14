import Joi from "joi";

export const userBodySchema = Joi.object({
    username: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    name: Joi.string().name().required(),
    password: Joi.string().min(4).required(),
    birthdate: Joi.date().required()
})

export const loginSchema = Joi.object({
    username: Joi.string().max(20).required(),
    password: Joi.string().min(4).required()
})

export const userParamsSchema = Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'numbers').required(),
})