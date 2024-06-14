import express from "express";
import { AuthController } from "../../../controllers/auth.controller.js";

const authRouter = express.Router();
authRouter.route("/register").post(AuthController.register);
authRouter.route("/login").post(AuthController.login);
export { authRouter };
