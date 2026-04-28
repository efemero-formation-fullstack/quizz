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
  gender: string;
}

export interface LoginData {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  gender: string;
}
