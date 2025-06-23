import express from "express";
import { CreateMovieType } from "./interface.js";
import {
  addWorkSchedule,
  getAdminTheatreLocation,
  getAllEmployeeData,
  getEmployeeWorkSchdule,
  getLocketSchedule,
} from "./services.js";
import routeErrorHandler from "../../utils/route-error-handler.js";
import dayjs from "dayjs";

export class WorkScheduleController {
  static createWorkSchedule = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const createWorkData = req.body as CreateMovieType;
      const data = await addWorkSchedule(
        createWorkData.employeeId,
        createWorkData.timeStart,
        createWorkData.timeEnd,
        createWorkData.theatre,
        createWorkData.locketName
      );
      res.status(200).json({ message: "Data berhasil ditambahkan" });
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };

  static sendWorkSchedule = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { timeStart } = req.query as {
        timeStart: string;
      };
      const akhir = dayjs(timeStart).add(7, "day");
      //ini harusnya dapat dari header id adminnya
      const theatreLocation = await getAdminTheatreLocation("lisal_admin");
      const data = await getLocketSchedule(
        theatreLocation.theatre_location,
        dayjs(timeStart).format("YYYY-MM-DDTHH:mm"),
        akhir.format("YYYY-MM-DDTHH:mm")
      );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };

  static sendEmployeeSchedule = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const data = await getEmployeeWorkSchdule("EMP/xx/002");
      res.status(200).json(data);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };

  static sendEmployeeData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      //harusnya dapat ini dari bearer lagi
      const theatreLocation = await getAdminTheatreLocation("lisal_admin");
      const data = await getAllEmployeeData(theatreLocation.theatre_location);
      res.status(200).json(data);
    } catch (error) {
      routeErrorHandler(next, error);
    }
  };
}
