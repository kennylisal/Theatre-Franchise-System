import Joi from "joi";

const employeeLoginValidationSchema = Joi.object({
  username: Joi.string().required(),
  newPassword: Joi.string().required(),
}).required();

const employeeCredentialSchema = Joi.object({
  username: Joi.string().required(),
  token: Joi.string().required(),
}).required();

export { employeeLoginValidationSchema, employeeCredentialSchema };
