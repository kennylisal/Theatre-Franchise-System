import { NextFunction } from "express";
import Joi from "joi";
import joiValidationtoAppError from "./joi-validaton-errors.js";
import { AppError, HttpCode } from "./app-error.js";

function routeErrorHandler(next: NextFunction, error: unknown) {
  if (error instanceof Joi.ValidationError) {
    next(joiValidationtoAppError(error));
  } else if (error instanceof AppError) {
    next(error);
  } else {
    const message =
      error instanceof Error ? error.message : "Unknown Error occured";
    const appErr = new AppError(
      "Backend Error",
      HttpCode.INTERNAL_SERVER_ERROR,
      message,
      true
    );
    console.log(appErr.message);
    next(appErr);
  }
}

export default routeErrorHandler;
