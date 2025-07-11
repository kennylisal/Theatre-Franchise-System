import Joi from "joi";
import { CreateMovieSchema } from "./interface.js";

const getActiveMoviesSchema = Joi.object({
  limit: Joi.number().optional(),
  orderBy: Joi.string()
    .valid("created_at,movie_name,movie_duration")
    .optional(),
});
export { getActiveMoviesSchema };
// export { createMovieSchema, getActiveMoviesSchema as getActiveMovies };
