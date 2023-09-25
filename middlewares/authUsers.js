import ROLES from "../helpers/roles.js";
import HTTP_STATUS from "../helpers/httpStatus.js";
import jwt from "jsonwebtoken";

export const authUsers = (req, res, next) => {
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

  if (id.toString() === req.params.id || role.name === ROLES.ADMIN) {
    next();
  } else {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Unautorized User",
    });
  }
};
