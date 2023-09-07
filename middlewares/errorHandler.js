import httpStatus from "../helpers/httpStatus";
import prisma from "../database/prisma";

const ERROR_HANDLERS = {
  P2002: ({ error, response }) => {
    response.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Unique constraint failed on one or more fields",
      error: error.message,
    });
  },
  ValidationError: ({ error, response }) => {
    response.status(httpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: "Error on request data",
        error: error.message
    }),
  },
  defaultError: ({ error, response }) => {
    response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "An error has occurred",
        error: error.message,
    });
  },
};

const errorHandler= (error, _request, response, _next) => {
    let option = error.name;

    if(error.isJoi) {
        option = "ValidationError";
    }

    if(error instanceof prisma.PrismaClientKnownRequestError) {
        option = error.code;
    }

    const handler = ERROR_HANDLERS[option] ?? ERROR_HANDLERS.defaultError;
    handler({ response, error });
}

export default errorHandler;