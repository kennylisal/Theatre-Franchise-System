interface TransactionMovieShowing {
  movie: string;
  movie_name: string;
  movie_image: string;
  showtimes: Showtimes[];
}

interface Showtimes {
  started_at: string;
  movie_schedule_id: string;
}

interface MovieShowingDataRequest {
  movie: string;
  movie_name: string;
  movie_image: string;
  started_at: string;
  movie_schedule_id: string;
}

export {
  type TransactionMovieShowing,
  type MovieShowingDataRequest,
  type Showtimes,
};
