export interface User {
  id: string;
  email: string;
  nom: string;
  role: "ADMIN" | "USER" | "MANAGER";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
