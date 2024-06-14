import httpStatus from "http-status";
import {
  AuthRequest,
  AuthResponse,
  UserRequest,
  UserResponse,
} from "../models/type.js";
import { pgPool } from "./dbPostgres.js";
import bcrypt from "bcrypt";
export interface User {
  user_id: number;
  email: string;
  password: string;
  phonenumber: string;
  fullname: string;
  gender?: string;
  createdAt: Date;
  lastModifiedDate: Date;
  role: string;
}
export const checkUserByEmail = async (email: String): Promise<String> => {
  const result = await pgPool.query<String>(
    `select email from public."User"
        where email = $1`,
    [email]
  );
  const checkEmail = result.rows[0] as String;
  return checkEmail;
};
export const getUserByEmail = async (email: String): Promise<UserResponse> => {
  const result = await pgPool.query<UserResponse>(
    `select * from public."User"
        where email = $1`,
    [email]
  );
  const user = result.rows[0];
  return user;
};
// export const checkLogin = async (user: AuthRequest): Promise<UserResponse> => {
//   const checkUser = await pgPool.query<UserResponse>(
//     `select * from public."User"
//         where email = $1`,
//     [user.email]
//   );
//   const checkPassword = bcrypt.compare(
//     checkUser.rows[0].password,
//     user.password
//   );
// };
const createdUserModel = async (user: AuthRequest): Promise<UserResponse> => {
  user.password = await bcrypt.hash(user.password, 7);
  const result = await pgPool.query<UserRequest>(
    `INSERT INTO public."User" (email, password, fullname)
        VALUES ($1, $2, $3) RETURNING *`,
    [user.email, user.password, user.fullname]
  );
  const newUser = result.rows[0] as UserResponse;
  return newUser;
};
const getUserModels = async (): Promise<Array<UserResponse>> => {
  const result =
    await pgPool.query(`SELECT user_id, email, password, phonenumber, fullname, createdat, lastmodifieddate, role, gender
	FROM public."User";`);
  const users = result.rows as Array<UserResponse>;
  console.log(users);

  return users;
};
const getUserModelById = async (userId: Number): Promise<UserResponse> => {
  const result = await pgPool.query(
    `SELECT *
	FROM public."User" where user_id = $1;`,
    [userId]
  );
  const user = result.rows[0];
  console.log(user);
  return user;
};
export const UserModel = {
  getUserModels,
  checkUserByEmail,
  createdUserModel,
  getUserByEmail,
  getUserModelById,
};
