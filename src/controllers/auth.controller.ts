import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import {
  AuthRequest,
  AuthRequest2,
  UserRequest,
  UserResponse,
} from "../models/type.js";
import AuthService from "../services/auth.service.js";
import { TokenService } from "../services/token.service.js";
const register = catchAsync(
  async (req: Request | AuthRequest2, res: Response) => {
    const user = req.body as UserRequest;
    const users = await AuthService.register(user);
    return res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Register user successful!",
      data: users,
    });
  }
);
const login = catchAsync(async (req: Request | AuthRequest2, res: Response) => {
  const userBody = req.body as AuthRequest;
  const user = await AuthService.login(userBody);
  if (!user) {
    return res.status(httpStatus.OK).json({
      code: httpStatus.NOT_FOUND,
      message: "Login failed!",
    });
  }
  const tokens = await TokenService.createAuthTokens(user);
  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: "Login successful!",
    data: tokens,
  });
});

export const AuthController = { register, login };
