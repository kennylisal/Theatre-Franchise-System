import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import joiValidationtoAppError from "../utils/joi-validaton-errors.js";
import routeErrorHandler from "../utils/route-error-handler.js";
import { AppError } from "../utils/app-error.js";

const validateQuery = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      console.log("error validation joi");
      routeErrorHandler(next, error);
    }
  };
};

export default validateQuery;
