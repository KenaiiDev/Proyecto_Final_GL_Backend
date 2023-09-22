import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";

export const usersRoutes = () => {
  const usersRouter = Router();
  const { getUsers, getUserById, createUser, updateUser, deleteUser } =
    usersController();

  usersRouter.route("/users").get(getUsers).post(createUser);

  usersRouter
    .route("/users/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

  return usersRouter;
};
