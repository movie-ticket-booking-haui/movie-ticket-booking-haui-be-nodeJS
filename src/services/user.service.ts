import httpStatus from "http-status";
import { UserModel } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { Request, Response, NextFunction } from "express";
import { UserRequest, UserResponse } from "../models/type.js";
const createdUser = async (user: UserRequest): Promise<UserResponse> => {
  const newUser =
    ((await UserModel.createdUserModel(user)) as UserResponse) || null;
  if (newUser == null) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Create user failed");
  }
  return newUser;
};
const getUsers = async (): Promise<Array<UserResponse>> => {
  const users = await UserModel.getUserModels();
  if (users.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Uses not found");
  }
  return users;
};
const getUserById = async (userId: Number): Promise<UserResponse> => {
  const user = await UserModel.getUserModelById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};
export default { createdUser, getUsers, getUserById };
