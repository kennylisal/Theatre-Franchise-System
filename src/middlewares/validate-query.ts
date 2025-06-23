import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import routeErrorHandler from "../utils/route-error-handler.js";
import joiValidationtoAppError from "../utils/joi-validaton-errors.js";

const validateQuery = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.query, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
};

export default validateQuery;
