import Joi from "joi";
import joiErrortoDetail from "../../global/joi-error-helper";
import type { NewScheduleType } from "../interfaces/interfaces";
import { newScheduleSchema } from "./joi-schema";
import axios from "axios";

const updateMovieSchedule = async (
  scheduleData: NewScheduleType
): Promise<boolean> => {
  try {
    await newScheduleSchema.validateAsync(scheduleData);
    const response = await axios.put(
      "http://localhost:3000/movieSchedule/update",
      scheduleData
    );
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      console.log(joiErrortoDetail(error));
    } else {
      console.log(`Gagal tambah schedule cinema baru \n ${error}`);
    }
    return false;
  }
};

export { updateMovieSchedule };
