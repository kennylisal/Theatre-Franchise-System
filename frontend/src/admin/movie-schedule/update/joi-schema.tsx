import Joi from "joi";

const newScheduleSchema = Joi.object({
  movieId: Joi.string().required(),
  timeStart: Joi.string().required(),
  timeEnd: Joi.string().required(),
  price: Joi.number().required(),
  cinema: Joi.string().required(),
  movieName: Joi.string().required(),
  movieImage: Joi.string().required(),
  movie_schedule_id: Joi.string().required(),
}).required();

export { newScheduleSchema };
