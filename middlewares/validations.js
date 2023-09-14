import {
    userBodySchema,
    loginSchema,
    userParamsSchema
  } from "../validations/userSchema.js";

import {
    reviewSchema,
    reviewParamsSchema
  } from "../validations/reviewSchema.js"
  
  
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

  export const userParamsValidation = (req, _res, next) => {
    const data = req.params
    const { error } = userParamsSchema.validate(data);

    error ? next(error) : next();
  }

  export const reviewCreateValidation = (req, _res, next) => {
    const data = req.body;
    const { error } = reviewSchema.validate(data);
  
    error ? next(error) : next();
  };

  export const reviewParamsValidation = (req, _res, next) => {
    const data = req.params
    const { error } = reviewParamsSchema.validate(data);

    error ? next(error) : next();
  }



