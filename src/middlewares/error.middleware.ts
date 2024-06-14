import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { log } from "console";

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message, data } = err;

  // Set a default status code if none is provided
  if (!statusCode) {
    statusCode = 500; // Internal Server Error
  }

  res.locals.errorMessage = err.message;
  console.error(err);
  const response = {
    code: statusCode,
    message,
    data,
  };

  res.status(statusCode).json(response);
};

export { errorHandler };
