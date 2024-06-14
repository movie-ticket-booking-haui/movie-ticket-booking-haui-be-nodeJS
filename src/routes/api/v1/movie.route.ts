import express from "express";
import { MovieController } from "../../../controllers/movie.controller.js";
import upload from "../../../middlewares/upload.middleware.js";

const movieRouter = express.Router();
movieRouter
  .route("/")
  .get(MovieController.getMovies)
  .post(
    upload.fields([{ name: "image" }, { name: "trailer" }]),
    MovieController.createMovie
  );
export { movieRouter };
