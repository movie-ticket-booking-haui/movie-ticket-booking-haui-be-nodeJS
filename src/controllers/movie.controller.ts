import httpStatus from "http-status";
import { MovieService } from "../services/movie.service.js";
import catchAsync from "../utils/catchAsync.js";
import { Request, Response } from "express";
import { Movie } from "../models/type.js";
import ApiError from "../utils/ApiError.js";

const getMovies = catchAsync(async (req: Request, res: Response) => {
  const movies = await MovieService.getMovies();

  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Get Movies successful!",
    data: movies,
  });
});

const createMovie = catchAsync(async (req: Request, res: Response) => {
  const movie: Movie = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  if (
    !files ||
    Object.keys(files).length !== 2 ||
    !files.image ||
    !files.trailer
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Both image and sound files are required"
    );
  }
  const imageFile = files.image[0];
  const trailerFile = files.trailer[0];
  const imagePath = imageFile.path.replace(/\\/g, "/");
  const trailerPath = trailerFile.path.replace(/\\/g, "/");
  movie.image = imagePath;
  movie.trailer = trailerPath;
  const newMovie = await MovieService.createMovie(movie);

  return res.status(httpStatus.CREATED).json({
    code: httpStatus.CREATED,
    message: "Create Movie successful!",
    data: newMovie,
  });
});
export const MovieController = { getMovies, createMovie };
