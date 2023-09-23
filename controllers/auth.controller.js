import httpStatus from "../helpers/httpStatus.js";
import prisma from "../database/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authController = () => {
  const register = async (req, res, next) => {
    try {
      const { username, email, name, password, birthdate } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const birthdateParsed = new Date(birthdate).toISOString();

      //check if username or email already exists
      const userExists = await prisma.Users.findFirst({
        where: {
          OR: [
            {
              username: username,
            },
            {
              email: email,
            },
          ],
        },
      });

      if (userExists)
        return res.status(httpStatus.CONFLICT).json({
          success: false,
          message: "User already exists",
        });

      const userRole = await prisma.Roles.findFirst({
        where: {
          name: "USER",
        },
      });

      const user = await prisma.Users.create({
        data: {
          username,
          email,
          name,
          password: hashedPassword,
          birthdate: birthdateParsed,
          role: {
            connect: {
              id: userRole.id,
            },
          },
        },
      });

      user.password = undefined;

      res.status(httpStatus.OK).json({
        success: true,
        message: "Register user",
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.Users.findUnique({
        where: {
          username: username,
        },
        include: {
          role: true,
        },
      });

      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ success: false, message: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ success: false, message: "Invalid Credentials" });

      const payload = {
        user: {
          id: user.id,
          username: user.username,
          role: user.role.name,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "User logged in successfully",
        token,
        refreshToken,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const changePassword = async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.params;

      const user = await prisma.Users.findUnique({
        where: {
          id: id,
        },
      });

      if (!user)
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch)
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "Invalid Credentials",
        });

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await prisma.Users.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      updatedUser.password = undefined;

      res.status(httpStatus.OK).json({
        success: true,
        message: "Password changed successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateProfile = async (req, res, next) => {
    try {
      const { username, email, name, birthdate } = req.body;
      const { id } = req.params;

      const parsedBirthdate = birthdate
        ? new Date(birthdate).toISOString()
        : undefined;

      //check if the user or email already exists, ignoring his own data
      const userExists = await prisma.Users.findFirst({
        where: {
          OR: [
            {
              username: username,
            },
            {
              email: email,
            },
          ],
          NOT: {
            id: id,
          },
        },
      });

      if (userExists)
        return res.status(httpStatus.CONFLICT).json({
          success: false,
          message: "User already exists",
        });

      const updatedUser = await prisma.Users.update({
        where: {
          id: id,
        },
        data: {
          username,
          email,
          name,
          birthdate: parsedBirthdate,
        },
      });

      updatedUser.password = undefined;

      res.status(httpStatus.OK).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

      const payload = {
        user: {
          id: decoded.user.id,
          username: decoded.user.username,
          role: decoded.user.role,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(httpStatus.OK).json({
        success: true,
        message: "Token refreshed successfully",
        token,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    register,
    login,
    changePassword,
    updateProfile,
    refreshToken,
  };
};
