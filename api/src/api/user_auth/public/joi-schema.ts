import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
}).required();

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { signUpSchema, loginSchema };
