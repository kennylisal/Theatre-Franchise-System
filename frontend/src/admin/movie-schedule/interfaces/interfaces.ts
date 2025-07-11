import type { Dayjs } from "dayjs";
import type { MovieObject } from "../../../public/movies/interfaces";

interface FormModalCreateProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  movieData: MovieObject[];
  movieDataHasLoad: boolean;
  cinemaId: string;
  setScheduleData: React.Dispatch<
    React.SetStateAction<Map<string, CinemaScheduleHeader>>
  >;
  tglPilihan: Dayjs;
}

interface FormModalUpdateProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  setScheduleData: React.Dispatch<
    React.SetStateAction<Map<string, CinemaScheduleHeader>>
  >;
  movieProp: NewScheduleType | undefined;
  movieData: MovieObject[];
}

interface ScheduleMovieProp {
  movieId: string;
  movieName: string;
  hargaTiket: number;
  awalWaktu: Dayjs | null;
  akhirWaktu: Dayjs | null;
  movieImage: string;
}

interface ModalDataProp {
  open: boolean;
  movieDataHasLoad: boolean;
}

interface CinemaScheduleHeader {
  cinema_id: string;
  cinema_name: string;
  detail: NewScheduleType[];
}

interface CinemaScheduleData {
  cinema_id: string;
  cinema_name: string;
  movie: string | null;
  started_at: string | null;
  end_at: string | null;
  price: number | null;
  movie_schedule_id: string | null;
  movie_name: string | null;
  movie_image: string;
}

interface NewScheduleType {
  movieId: string | null;
  timeStart: string | null;
  timeEnd: string | null;
  price: number | null;
  cinema: string | null;
  movieName: string | null;
  movieImage: string | null;
  movie_schedule_id: string | null;
}

interface CreateRequestResponse {
  id: string;
  isSuccessful: boolean;
}

export {
  type FormModalCreateProps as FormModalProps,
  type ScheduleMovieProp,
  type ModalDataProp,
  type CinemaScheduleHeader,
  type CinemaScheduleData,
  type NewScheduleType,
  type CreateRequestResponse,
  type FormModalUpdateProps,
};
