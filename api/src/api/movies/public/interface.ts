interface MovieResult {
  movie_name: string;
  external_link: string;
  external_info: object;
  created_at: string;
  movie_image: string;
  movie_duration: number;
}

interface CreateMovieSchema {
  movieName: string;
  activeStatus: boolean;
  movieImage: string;
  movieDuration: number;
  externalInfo?: object;
  externalLink?: string;
  // employeeId: string;
}
export { MovieResult, CreateMovieSchema };
