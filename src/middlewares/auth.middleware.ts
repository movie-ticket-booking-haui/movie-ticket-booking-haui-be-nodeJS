import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import { Request, Response, NextFunction } from "express";
import { pgPool } from "../models/dbPostgres.js";
import { AuthRequest2, UserRequest, UserResponse } from "../models/type.js";

const extractTokenFromHeader = (
  req: Request | AuthRequest2
): string | undefined => {
  const authorizationHeader = (req.headers as any).authorization;
  const [type, accessToken] = authorizationHeader
    ? authorizationHeader.split(" ")
    : [];

  return type === "Bearer" ? accessToken : undefined;
};

const authMiddleware = catchAsync(
  async (
    req: Request | AuthRequest2 | any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const accessToken = extractTokenFromHeader(req);
    if (!accessToken) {
      throw new ApiError(
        +httpStatus.UNAUTHORIZED,
        "Phiên bản hết hạn. Vui lòng đăng nhập lại!"
      );
    }
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY || "movieticketbookinghaui"
    ) as jwt.JwtPayload;
    if (!payload)
      throw new ApiError(+httpStatus.UNAUTHORIZED, "Vui lòng xác thực!");
    const { user_id } = payload;
    const user = (
      await pgPool.query<UserResponse>(
        `select * from public."User" where user_id = $1`,
        [user_id]
      )
    ).rows[0];
    if (!user)
      throw new ApiError(
        +httpStatus.UNAUTHORIZED,
        "Không tìm thấy người dùng!"
      );
    req.accessToken = accessToken;
    req.user = user;
    next();
  }
);

export { authMiddleware };
