import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

export const authRoutes = () => {
  const authRouter = Router();

  const { register, login, changePassword, updateProfile, refreshToken } =
    authController();

  authRouter.route("/auth/register").post(register);
  authRouter.route("/auth/login").post(login);

  authRouter.route("/auth/update/password/:id").post(changePassword);
  authRouter.route("/auth/update/profile/:id").post(updateProfile);

  authRouter.route("/auth/refresh").post(refreshToken);

  return authRouter;
};
