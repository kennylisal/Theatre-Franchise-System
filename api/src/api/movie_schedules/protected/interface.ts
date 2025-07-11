interface CinemaInfo {
  cinemaId: string;
  capacity: number;
  seatingSchema: any;
  cinemaName: string;
  theatreLocation: string;
}

interface MovieSchedule {
  movieName: string;
  price: number;
  timeStart: string;
  timeEnd: string;
  cinema: string;
}

export { CinemaInfo, MovieSchedule };
