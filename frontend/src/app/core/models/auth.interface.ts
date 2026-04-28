import { Gender } from '../enums/gender.enum';

export interface LoginResponse {
  token: string;
}

export interface JwtDecoded {
  id: number;
  role: string;
  exp: number;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  gender: Gender;
}

export interface LoginData {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  gender: Gender;
}

export interface LoginData {
  username: string;
  password: string;
}
