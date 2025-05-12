import Joi from "joi";
import { CreateMovieSchema } from "./interface.js";

const createMovieSchema = Joi.object<CreateMovieSchema>({
  movieName: Joi.string().required(),
  activeStatus: Joi.bool().required(),
  movieImage: Joi.string().required(),
  movieDuration: Joi.number().required(),
  externalInfo: Joi.object(),
  externalLink: Joi.string(),
  //   employeeId: Joi.string().required(),
}).required();

const getActiveMoviesSchema = Joi.object({
  limit: Joi.number().optional(),
  orderBy: Joi.string()
    .valid("created_at,movie_name,movie_duration")
    .optional(),
});
export { createMovieSchema, getActiveMoviesSchema };
// export { createMovieSchema, getActiveMoviesSchema as getActiveMovies };
