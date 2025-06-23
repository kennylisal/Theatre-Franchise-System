import Joi from "joi";

const getMovieScheduleDetail = Joi.object({
  movieScheduleId: Joi.string().required(),
});

export { getMovieScheduleDetail };
