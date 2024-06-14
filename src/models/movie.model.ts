import { pgPool } from "./dbPostgres.js";
import { Movie } from "./type.js";

const getMovies = async (): Promise<Array<Movie>> => {
  const result = await pgPool.query(`SELECT * FROM public."Movie"
  ORDER BY movie_id ASC `);
  const movies = result.rows as Array<Movie>;
  return movies;
};

const createMovie = async (movie: Movie): Promise<Movie> => {
  const result = await pgPool.query(
    `INSERT INTO public."Movie" (name, title, release_date, genre_id, image, director, country, language, trailer, rating, movie_typing, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`,
    [
      movie.name,
      movie.title,
      movie.release_date,
      movie.genre_id,
      movie.image,
      movie.director,
      movie.country,
      movie.language,
      movie.trailer,
      movie.rating,
      movie.movie_typing,
      movie.is_active,
    ]
  );
  console.log(result.rows[0]);
  return result.rows[0] as Movie;
};

export const MovieModel = {
  getMovies,
  createMovie,
};
