import Joi from "joi";
import { AppError, HttpCode } from "./app-error.js";

function joiValidationtoAppError(error: Joi.ValidationError): AppError {
  const details = error.details.map((detail) => ({
    message: detail.message,
    path: detail.path,
    type: detail.type,
    context: detail.context,
  }));
  return new AppError(
    "Data Validation Error",
    HttpCode.BAD_REQUEST,
    details,
    true
  );
}

export default joiValidationtoAppError;
