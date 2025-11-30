import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Helper to normalize localStorage user
const getStoredUser = () => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  const parsed = JSON.parse(raw);

  return {
    ...parsed,
    role: parsed.role.toLowerCase(), // normalize here
  } as User;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  token: localStorage.getItem("token") || null,

  login: (user, token) => {
    const normalized = {
      ...user,
      role: user.role.toLowerCase() as "admin" | "user",
    };

    set({ user: normalized, token });
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
}));
