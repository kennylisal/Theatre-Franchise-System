import Joi from "joi";

const employeeLoginValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const employeeCredentialSchema = Joi.object({
  username: Joi.string().required(),
  token: Joi.string().required(),
});

export { employeeLoginValidationSchema, employeeCredentialSchema };
