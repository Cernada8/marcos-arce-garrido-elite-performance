export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
  message?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
}