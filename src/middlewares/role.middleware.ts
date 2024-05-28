// import ApiError from "../utils/ApiError.js";
// import httpStatus from "http-status";
// import { Response,NextFunction } from "express";
// import { AuthRequest } from "../models/type.js";
// const roles = (rolesAllow:any) => (req:AuthRequest, res:Response, next:NextFunction) => {
//     if (!rolesAllow.includes(req.user!.role)) {
//         return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized!'));
//     }
//     next();
// };
// export{roles};
