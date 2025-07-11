import Joi from "joi";

const employeeLoginValidationSchema = Joi.object({
  username: Joi.string().required(),
  newPassword: Joi.string().required(),
}).required();

const employeeCredentialSchema = Joi.object({
  username: Joi.string().required(),
  token: Joi.string().required(),
}).required();

const createEmployeeRequestScehma = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  location: Joi.string().required(),
  acc_status: Joi.string().required(),
  action: Joi.string().required(),
}).required();

const changePasswordRequestSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

export {
  employeeLoginValidationSchema,
  employeeCredentialSchema,
  createEmployeeRequestScehma,
  changePasswordRequestSchema,
};
