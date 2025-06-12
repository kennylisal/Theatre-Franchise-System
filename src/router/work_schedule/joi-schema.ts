import Joi, { allow } from "joi";
import { CreateMovieType } from "./interface.js";

const createWorkScheduleSchema = Joi.object<CreateMovieType>({
  employeeId: Joi.string().required(),
  locketName: Joi.string().required(),
  theatre: Joi.string().required(),
  timeEnd: Joi.string().required(),
  timeStart: Joi.string().required(),
})
  .required()
  .unknown(true);

const getWorkScheduleSchema = Joi.object({
  timeStart: Joi.string().required(),
})
  .required()
  .unknown(true);

export { createWorkScheduleSchema, getWorkScheduleSchema };
