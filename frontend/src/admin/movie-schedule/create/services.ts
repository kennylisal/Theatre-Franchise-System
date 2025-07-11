import axios from "axios";
import type {
  CreateRequestResponse,
  ScheduleMovieProp,
} from "../interfaces/interfaces";
import { newMovieSchema } from "../interfaces/joi-schema";
import Joi from "joi";
import joiErrortoDetail from "../../global/joi-error-helper";

const sendNewSchedule = async (
  formData: ScheduleMovieProp,
  cinemaId: string
): Promise<CreateRequestResponse> => {
  try {
    const body = {
      movieId: formData.movieId,
      timeStart: formData.awalWaktu!.format("YYYY-MM-DDTHH:mm"),
      timeEnd: formData.akhirWaktu!.format("YYYY-MM-DDTHH:mm"),
      price: formData.hargaTiket,
      cinema: cinemaId,
    };
    await newMovieSchema.validateAsync(body, { abortEarly: false });
    const response = await axios.post(
      "http://localhost:3000/movieSchedule/create",
      body
    );
    if (response.status == 200) {
      const { movie_schedule_id } = response.data;
      return { id: movie_schedule_id, isSuccessful: true };
    } else {
      return { id: "", isSuccessful: false };
    }
    // return { id: "xxFilmbaruxx", isSuccessful: true };
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      console.log(joiErrortoDetail(error));
    } else {
      console.log(`Gagal tambah schedule cinema baru \n ${error}`);
    }
    return { id: "", isSuccessful: false };
  }
};

export { sendNewSchedule };
