import axios from "axios";
import type {
  MovieShowingDataRequest,
  Showtimes,
  TransactionMovieShowing,
} from "./interface";
import type { Dayjs } from "dayjs";
import { baseApiUrl } from "../../global";

const fetchDisplayMovie = async (
  date: Dayjs
): Promise<{ success: boolean; data: TransactionMovieShowing[] }> => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/movieSchedule/getTransactionalMovie?timeStart=${date.format(
        "YYYY-MM-DD"
      )}`
    );
    if (response.status === 200) {
      const datas = response.data as MovieShowingDataRequest[];
      const mapData = new Map<string, TransactionMovieShowing>();
      datas.forEach((data) => {
        const times: Showtimes = {
          started_at: data.started_at,
          movie_schedule_id: data.movie_schedule_id,
        };
        if (mapData.has(data.movie)) {
          mapData.set(data.movie, {
            movie: data.movie,
            movie_image: data.movie_image,
            movie_name: data.movie_name,
            showtimes: [times],
          });
        } else {
          mapData.get(data.movie)?.showtimes.push(times);
        }
      });
      const result: TransactionMovieShowing[] = [];
      mapData.forEach((data) => {
        result.push(data);
      });
      return { success: true, data: result };
    } else {
      return { success: false, data: [] };
    }
  } catch (error) {
    console.log(`Gagal load film aktif \n ${error}`);
    return { success: false, data: [] };
  }
};

export { fetchDisplayMovie };
