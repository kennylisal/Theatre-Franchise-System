import Joi from "joi";

const signUpFormSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Username is required",
    "string.min": "Name must be at least 3 characters",
  }),
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 30 characters",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  dateOfBirth: Joi.string().min(1).required().messages({
    "string.empty": "Date of birth is required",
    "string.min": "Date of birth necessary",
  }),
});

interface singupFormType {
  name: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export { signUpFormSchema, type singupFormType };
