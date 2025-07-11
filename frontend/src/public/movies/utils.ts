import type { MovieDisplay, MovieObject } from "./interfaces";

function generateMovieDisplayData(datas: MovieObject[]): MovieDisplay[] {
  const res = datas.map((data) => {
    const genres = data.external_info
      ? data.external_info.genres
      : ["Belum Tersedia"];
    genres.push(String(data.movie_duration) + " m");

    return {
      name: data.movie_name,
      picture: data.movie_image,
      genres: genres,
    } as MovieDisplay;
  });
  return res;
}

export { generateMovieDisplayData };
