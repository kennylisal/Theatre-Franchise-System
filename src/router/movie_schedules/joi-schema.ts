import Joi from "joi";

// const createMovieScheduleSchema = Joi.object({
//   movieId: Joi.string().min(3).required(),
//   timeStart: Joi.string().required(),
//   timeEnd: Joi.string().required(),
//   price: Joi.number().min(30000).required(),
//   theatre: Joi.string().min(4).required(),
//   cinema: Joi.object({
//     cinemaId: Joi.string().required(),
//     capacity: Joi.number().required(),
//     seatingSchema: Joi.object().required(),
//     cinemaName: Joi.string().required(),
//   }),
// }).required();

const updateMovieScheduleSchema = Joi.object({
  movieId: Joi.string().required(),
  timeStart: Joi.string().required(),
  timeEnd: Joi.string().required(),
  price: Joi.number().required(),
  movie_schedule_id: Joi.string().required(),
})
  .required()
  .unknown(true);

const createMovieScheduleSchema = Joi.object({
  movieId: Joi.string().required(),
  timeStart: Joi.string().required(),
  timeEnd: Joi.string().required(),
  price: Joi.number().min(25000).required(),
  cinema: Joi.string().required(),
}).required();

const getMovieScheduleQuery = Joi.object({
  movieScheduleId: Joi.string().required(),
}).required();

const getMovieShowingQuery = Joi.object({
  theatreLocation: Joi.string().required().messages({
    "any.required": "theatreLocation query parameter is required",
    "string.base": "theatreLocation must be a string",
  }),
  timeStart: Joi.string().required(),
  timeEnd: Joi.string().required(),
}).required();

export {
  createMovieScheduleSchema,
  getMovieScheduleQuery,
  getMovieShowingQuery,
  updateMovieScheduleSchema,
};
