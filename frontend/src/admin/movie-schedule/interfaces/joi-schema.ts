import Joi from "joi";

const newMovieSchema = Joi.object({
  movieId: Joi.string().min(1).required(),
  price: Joi.number().min(25000).required(),
  timeStart: Joi.string().min(5).required(),
  timeEnd: Joi.string().min(5).required(),
  cinema: Joi.string().min(5).required(),
}).required();

export { newMovieSchema };
