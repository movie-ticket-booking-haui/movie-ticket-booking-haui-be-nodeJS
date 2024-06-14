import express from "express";
import { getUsers, getMe } from "../../../controllers/user.controller.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.use(authMiddleware);
userRouter.route("/me").get(getMe);
export { userRouter };
