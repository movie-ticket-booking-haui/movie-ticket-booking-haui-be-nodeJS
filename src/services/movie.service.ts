import httpStatus from "http-status";
import { MovieModel } from "../models/movie.model.js";
import { Movie } from "../models/type.js";
import ApiError from "../utils/ApiError.js";

const getMovies = async (): Promise<Movie[]> => {
  const movies = await MovieModel.getMovies();
  if (movies.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Uses not found");
  }
  return movies;
};
const createMovie = async (movie: Movie): Promise<Movie> => {
  const newMovie = await MovieModel.createMovie(movie);
  if (!newMovie) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Create movie failed");
  }
  return newMovie;
};
export const MovieService = { getMovies, createMovie };
