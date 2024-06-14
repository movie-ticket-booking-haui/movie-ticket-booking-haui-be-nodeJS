import express, { Router } from "express";
import { userRouter } from "./user.route.js";
import { authRouter } from "./auth.route.js";
import { movieRouter } from "./movie.route.js";

const routers = express.Router();
interface routerAny {
  path: string;
  route: Router;
}
const defaultRoutes: Array<routerAny> = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/movies",
    route: movieRouter,
  },
];

defaultRoutes.forEach((route) => {
  routers.use(route.path, route.route);
});

export { routers };
