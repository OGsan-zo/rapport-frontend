export interface User {
  id: string;
  email: string;
  nom: string;
  role: "ADMIN" | "USER" | "MANAGER";
}

export interface Entite {
  id: string;
  nom: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nom: string;
  entiteId: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
