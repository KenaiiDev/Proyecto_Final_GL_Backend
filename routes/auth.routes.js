import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

import {
  userLoginValidation,
  userCreateValidation,
  userUpdateValidation,
  userParamsValidation,
} from "../middlewares/validations.js";

import { authUsers } from "../middlewares/authUsers.js";

export const authRoutes = () => {
  const authRouter = Router();

  const { register, login, changePassword, updateProfile, refreshToken } =
    authController();

  authRouter.route("/auth/register").post(userCreateValidation, register);
  authRouter.route("/auth/login").post(userLoginValidation, login);

  authRouter
    .route("/auth/update/password/:id")
    .post(
      authUsers,
      userUpdateValidation,
      userParamsValidation,
      changePassword
    );
  authRouter
    .route("/auth/update/profile/:id")
    .post(authUsers, userUpdateValidation, userParamsValidation, updateProfile);

  authRouter.route("/auth/refresh").post(refreshToken);

  return authRouter;
};
