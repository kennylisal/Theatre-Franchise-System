import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import joiValidationtoAppError from "../utils/joi-validaton-errors.js";
import routeErrorHandler from "../utils/route-error-handler.js";
import { AppError } from "../utils/app-error.js";

const validateBody = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      console.log("selesai validasi body");
      next();
    } catch (error) {
      console.log("Masuk validate body error");
      routeErrorHandler(next, error);
    }
  };
};

export default validateBody;
