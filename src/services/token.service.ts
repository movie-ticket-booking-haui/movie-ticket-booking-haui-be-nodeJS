import jwt from "jsonwebtoken";
import { UserResponse } from "../models/type.js";
import { tokenTypes } from "../config/token.js";
import { config } from "../config/config.js";
const generateToken = (
  user_id: number,
  type: string,
  secretKey: string,
  expires: string
) => {
  const payload = {
    user_id,
    type,
  };
  return jwt.sign(payload, secretKey, { expiresIn: expires.toString() });
};
const createAuthTokens = async (user: UserResponse) => {
  const accessTokenExpires = "1h";
  const accessToken = generateToken(
    user.user_id,
    tokenTypes.ACCESS,
    config.jwt.secret,
    accessTokenExpires
  );
  let expires = new Date();
  expires.setHours(expires.getHours() + parseInt(accessTokenExpires));
  return {
    access: {
      token: accessToken,
      expires: expires,
    },
  };
};
export const TokenService = { generateToken, createAuthTokens };
