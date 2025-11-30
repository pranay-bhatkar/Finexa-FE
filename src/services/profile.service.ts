import { API } from "@/config/api";
import api from "@/lib/axios";

export interface ProfilePayload {
  name?: string;
  email?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
}

export const profileService = {
  getMe: async (): Promise<UserProfile> => {
    const { data } = await api.get(API.auth.me);
    return data.data;
  },

  updateUser: async (payload: ProfilePayload): Promise<UserProfile> => {
    const { data } = await api.patch(API.users.updateProfile, payload);
    return data.data;
  },
};
