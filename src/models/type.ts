export interface AuthResponse {
  accessToken?: string;
  user?: UserResponse;
}
export interface AuthRequest2 extends Request {
  accessToken: string;
  user: UserResponse;
}
export interface AuthRequest {
  email: string;
  password: string;
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
  fullname: string;
}

// Movie
export interface Movie {
  movie_id: number;
  name: string;
  title: string;
  release_date: Date;
  genre_id: number;
  image: string;
  director: string | null;
  country: string;
  language: string;
  trailer: string;
  rating: number;
  movie_typing: string | null;
  is_active: boolean;
}
