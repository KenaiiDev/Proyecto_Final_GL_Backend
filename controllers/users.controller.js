import httpStatus from "../helpers/httpStatus.js";
import prisma from "../database/prisma.js";
import bcrypt from "bcrypt";

export const usersController = () => {
  const createUser = async (req, res, next) => {
    try {
      const { username, email, name, password, birthdate } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const parsedBirthdate = new Date(birthdate).toISOString();

      const user = await prisma.Users.create({
        data: {
          username,
          email,
          name,
          password: hashedPassword,
          birthdate: parsedBirthdate,
        },
      });
      res.status(httpStatus.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedUser = await prisma.Users.delete({
        where: {
          id: id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getUsers = async (req, res, next) => {
    try {
      const users = await prisma.Users.findMany();

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get users",
        data: users,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getUserById = async (req, res, next) => {
    try {
      const user = await prisma.Users.findUnique({
        where: {
          id: req.params.id,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Get user by id",
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateUser = async (req, res, next) => {
    try {
      const { username, email, name, password, birthdate } = req.body;
      const { id } = req.params;
      const salt = !password ? undefined : await bcrypt.genSalt(10);
      const hashedPassword = !password
        ? undefined
        : await bcrypt.hash(password, salt);

      const birthdateParsed = !birthdate
        ? undefined
        : new Date(birthdate).toISOString();

      const user = await prisma.Users.update({
        where: {
          id: id,
        },
        data: {
          username,
          email,
          name,
          password: hashedPassword,
          birthdate: birthdateParsed,
        },
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    createUser,
    deleteUser,
    getUsers,
    getUserById,
    updateUser,
  };
};
