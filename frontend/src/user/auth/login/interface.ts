import Joi from "joi";

const loginFormSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
});

interface LoginFormType {
  username: string;
  password: string;
}

export { type LoginFormType, loginFormSchema };
