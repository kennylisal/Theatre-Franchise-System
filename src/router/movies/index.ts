import express, { NextFunction } from "express";
import { AuthRequest } from "../../middleware/interfaces.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import validateBody from "../../middleware/validate-body.js";
import { createMovieSchema, getActiveMoviesSchema } from "./joi-schema.js";
import { CreateMovieSchema } from "./interface.js";
import knexDB from "../../config/knex_db.js";
import { getActiveMovies, insertMovie } from "./query.js";
import { tesLogAdmin } from "../../logger/index.js";
import validateQuery from "../../middleware/validate-query.js";

const moviesRouter = express.Router();

moviesRouter.post(
  "/create",
  validateBody(createMovieSchema),
  async (req: AuthRequest, res: express.Response, next: NextFunction) => {
    try {
      const data: CreateMovieSchema = req.body;
      await knexDB.transaction(async (trx) => {
        const movieId = await insertMovie(
          data.movieName,
          data.activeStatus,
          data.movieImage,
          data.movieDuration,
          data.externalInfo,
          data.externalLink,
          trx
        );
        if (req.user)
          await tesLogAdmin(req.user.employee_id, "INSERT", movieId, trx);
      });
      res
        .status(200)
        .send({ message: `Film ${data.movieName} berhasil ditambahkan` });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);

moviesRouter.get(
  "/activeMovies",
  validateQuery(getActiveMoviesSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { limit, orderBy } = req.query as {
        limit?: string;
        orderBy?: string;
      };
      const movies = await getActiveMovies({
        limit: limit ? Number(limit) : undefined,
        orderBy: orderBy ? orderBy : undefined,
      });
      res.status(200).send(movies);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  }
);

export default moviesRouter;

// router.get(
//   '/movies',
//   authValidator,
//   validateQuery(movieQuerySchema),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const {
//         orderBy,
//         desc,
//         searchQuery,
//         movieStatus,
//         firstRange,
//         secondRange,
//         limit,
//         offset,
//       } = req.query as {
//         orderBy?: string;
//         desc?: string;
//         searchQuery?: string;
//         movieStatus?: string;
//         firstRange?: string;
//         secondRange?: string;
//         limit?: string;
//         offset?: string;
//       };

//       const result = await getMovies(
//         {
//           orderBy,
//           desc: desc === 'true' ? true : desc === 'false' ? false : undefined,
//           searchQuery,
//           movieStatus:
//             movieStatus === 'true' ? true : movieStatus === 'false' ? false : undefined,
//           firstRange,
//           secondRange,
//           limit: limit ? Number(limit) : undefined,
//           offset: offset ? Number(offset) : undefined,
//         },
//         undefined // Pass trx if needed
//       );

//       res.json({
//         data: result.data,
//         meta: {
//           limit: limit ? Number(limit) : 10,
//           offset: offset ? Number(offset) : 0,
//           total: result.total,
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
