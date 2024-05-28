import { Request } from "express";
export interface AuthResponse {
  accessToken?: string;
  user?: UserResponse;
}
export interface AuthRequest {
  email: string;
  password: string;
  phonenumber: string;
  fullname: string;
}
export interface UserResponse {
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
export interface UserRequest {
  email: string;
  password: string;
  phonenumber: string;
  fullname: string;
}
