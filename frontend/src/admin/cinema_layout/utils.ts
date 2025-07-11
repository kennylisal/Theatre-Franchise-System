import type Joi from "joi";

const checkFormError = (
  schema: Joi.ObjectSchema,
  form: object,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
): boolean => {
  const { error } = schema.validate(form, { abortEarly: false });
  if (error) {
    const errorMap: { [key: string]: string } = {};
    error.details.forEach((err) => {
      errorMap[err.path[0]] = err.message;
    });
    setErrors(errorMap);
    return false;
  }
  return true;
};

export { checkFormError };
