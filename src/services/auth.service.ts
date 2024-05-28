import httpStatus from "http-status";
import { UserModel } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { AuthRequest, UserRequest, UserResponse } from "../models/type.js";
import bcrypt from "bcrypt";
import { TokenService } from "./token.service.js";
const register = async (user: UserRequest): Promise<UserResponse> => {
  const checkEmail = await UserModel.checkUserByEmail(user.email);
  if (checkEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists!");
  }
  const newUser = (await UserModel.createdUserModel(user)) as UserResponse;
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Create user failed");
  }
  return newUser;
};
const login = async (user: AuthRequest): Promise<UserResponse> => {
  const userByEmail = await UserModel.getUserByEmail(user.email);
  if (!userByEmail) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email or password not already exists!"
    );
  }
  const checkPassword = await bcrypt.compare(
    user.password,
    userByEmail.password
  );
  console.log(checkPassword);

  if (!checkPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Login failed");
  }
  return userByEmail;
};
export default { register, login };
