import Joi from "joi";
import { CreateMovieSchema } from "../public/interface.js";

const createMovieSchema = Joi.object<CreateMovieSchema>({
  movieName: Joi.string().required(),
  activeStatus: Joi.bool().required(),
  movieImage: Joi.string().required(),
  movieDuration: Joi.number().required(),
  externalInfo: Joi.object(),
  externalLink: Joi.string(),
  //   employeeId: Joi.string().required(),
}).required();

export { createMovieSchema };
// export { createMovieSchema, getActiveMoviesSchema as getActiveMovies };
