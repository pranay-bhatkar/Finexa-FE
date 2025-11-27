export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// all api endpoints (centralised)
export const API = {
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    logout: `${BASE_URL}/api/auth/logout`,
    register: `${BASE_URL}/api/auth/register`,
    refresh: `${BASE_URL}/api/auth/refresh`,
    me: `${BASE_URL}/api/auth/me`,
    profile: `${BASE_URL}/api/auth/profile`,
  },
  transactions: {
    list: `${BASE_URL}/api/transactions`,
    create: `${BASE_URL}/api/transactions/create`,
    update: (id: string) => `${BASE_URL}/api/transactions/${id}`,
  },
};
