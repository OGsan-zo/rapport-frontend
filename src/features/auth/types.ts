export interface User {
  id?: number;
  email: string;
  entite: string;
  role: "Admin" | "Utilisateur";
}

export interface Entite {
  id: number;
  nom: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  entite: string;
  entiteId: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}
