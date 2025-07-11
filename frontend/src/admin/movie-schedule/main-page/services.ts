import axios from "axios";
import type {
  CinemaScheduleData,
  CinemaScheduleHeader,
  ModalDataProp,
} from "../interfaces/interfaces";
import type { MovieObject } from "../../../public/movies/interfaces";

const fetchModalMovies = async (
  modalData: ModalDataProp,
  setModalData: (value: React.SetStateAction<ModalDataProp>) => void,
  setModalMovies: (value: React.SetStateAction<MovieObject[]>) => void
): Promise<boolean> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/movies/activeMovies"
    );
    if (response.status == 200) {
      setModalData({
        ...modalData,
        movieDataHasLoad: true,
      });
      setModalMovies(response.data);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Gagal load film aktif \n ${error}`);
    return false;
  }
};

const fetchCinemaScheduleData = async (
  setScheduleData: (
    value: React.SetStateAction<Map<string, CinemaScheduleHeader>>
  ) => void,
  tglAwal: string
) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/movieSchedule/getMovieShowing",
      {
        params: {
          theatreLocation: "xxaxx",
          timeStart: `${tglAwal}T00:00:00`,
          timeEnd: tglAwal + "T23:59:59",
        },
      }
    );
    // console.log(response.data);
    if (response.status == 200) {
      const myMap = new Map<string, CinemaScheduleHeader>();
      (response.data as CinemaScheduleData[]).forEach((e) => {
        if (!myMap.has(e.cinema_id)) {
          myMap.set(e.cinema_id, {
            cinema_id: e.cinema_id,
            cinema_name: e.cinema_name,
            detail: [],
          });
        }
        if (e.movie != null) {
          myMap.get(e.cinema_id)?.detail.push({
            movieId: e.movie,
            timeStart: e.started_at,
            timeEnd: e.end_at,
            price: e.price,
            movie_schedule_id: e.movie_schedule_id,
            movieName: e.movie_name,
            movieImage: e.movie_image,
            cinema: e.cinema_id,
          });
        }
      });
      setScheduleData(myMap);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Gagal load schedule cinema \n ${error}`);
    return false;
  }
};

export { fetchModalMovies, fetchCinemaScheduleData };
