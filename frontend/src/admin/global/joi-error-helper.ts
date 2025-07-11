import type Joi from "joi";

function joiErrortoDetail(error: Joi.ValidationError) {
  const details = error.details.map((detail) => ({
    message: detail.message,
    path: detail.path,
    type: detail.type,
    context: detail.context,
  }));
  return details;
}

export default joiErrortoDetail;
