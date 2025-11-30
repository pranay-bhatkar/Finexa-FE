import { API } from "@/config/api";
import api from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
export interface AuthResponse {
  status: string;
  message: string;
  data?: {
    token: string;
    refreshToken: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: "ADMIN" | "USER";
      createdAt: string;
    };
  };
  statusCode?: number;
}
export interface ResetPassowrd {
  email: string;
  otp: string;
  newPassword: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(API.auth.login, payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(API.auth.register, payload);
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await api.post(API.auth.forgotPassword, { email });
    return data;
  },

  resetPassword: async (payload: ResetPassowrd) => {
    const { data } = await api.post(API.auth.resetPassword, payload);
    return data;
  },
};
