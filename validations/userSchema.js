import Joi from "joi";

export const creatorSchema = Joi.object({
    username: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    name: Joi.string().name().required(),
    password: Joi.string().min(4).required()
})

export const loginCreatorSchema = Joi.object({
    username: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required
})

export const creatorParamsSchema = Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'numbers').required(),
})