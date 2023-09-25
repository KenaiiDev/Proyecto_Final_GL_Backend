import ROLES from "../helpers/roles.js";
import HTTP_STATUS from "../helpers/httpStatus.js";
import jwt from "jsonwebtoken";
import prisma from "../database/prisma.js";

export const authReviews = async (req, res, next) => {
  const headers = req.headers;
  const authorization = headers && headers.authorization;
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { role, id } = decodedToken.user;
  const review = await prisma.Reviews.findUnique({
    where: { id: req.params.id },
  });
  if (
    review.authorId.toString() === id.toString() ||
    role.name === ROLES.ADMIN
  ) {
    next();
  } else {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Unautorized User",
    });
  }
};

export const authCreateReview = async (req, res, next) => {
  const headers = req.headers;
  const { authorization } = headers;
  const token = authorization.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = decodedToken.user;

  if (id.toString() !== req.body.userId) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Unautorized User",
    });
  }

  next();
};
