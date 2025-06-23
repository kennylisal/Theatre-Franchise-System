import express, { NextFunction } from "express";

import { createMovieSchema } from "./joi-schema.js";
import validateBody from "../../../middlewares/validate-body.js";
import { ProtectedMoviesController } from "./controller.js";

const protectedMoviesRouter = express.Router();

protectedMoviesRouter.post(
  "/create",
  validateBody(createMovieSchema),
  ProtectedMoviesController.createNewMovies
);

export default protectedMoviesRouter;

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
