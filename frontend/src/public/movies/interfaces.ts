interface MovieDisplay {
  name: string;
  picture: string;
  genres: string[];
}

interface MovieObject {
  created_at: Date;
  external_info?: {
    genres: string[];
    overview: string;
    release_date: string;
  };
  external_link?: string;
  movie_duration: number;
  movie_image: string;
  movie_name: string;
  movie_id: string;
}
export type { MovieDisplay, MovieObject };
