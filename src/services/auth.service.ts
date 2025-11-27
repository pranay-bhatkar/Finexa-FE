import { API } from "@/config/api";
import axios from "axios";

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

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(API.auth.login, payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(API.auth.register, payload);
    return data;
  },
};
