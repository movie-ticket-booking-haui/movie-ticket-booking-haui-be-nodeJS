import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service.js";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import { UserRequest } from "../models/type.js";
// get all users from PostgreSQL
const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getUsers();
    return res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Get Users successful!",
      data: users,
    });
  }
);
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as UserRequest;
    const users = await UserService.createdUser(user);
    return res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Get Users successful!",
      data: users,
    });
  }
);
export { getUsers, createUser };
