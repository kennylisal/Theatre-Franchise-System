interface CinemaInfo {
  cinemaId: string;
  capacity: number;
  seatingSchema: object;
  cinemaName: string;
}

interface MovieSchedule {
  movieName: string;
  price: number;
  timeStart: string;
  timeEnd: string;
  cinema: string;
}

export { CinemaInfo, MovieSchedule };
