import axios from "axios";

import { API } from "@/config/api";
import { useAuthStore } from "@/store/auth/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// TOKEN REFRESH QUEUE
let isRefreshing = false;
let refreshSubscriber: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscriber.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscriber.forEach((cb) => cb(token));
  refreshSubscriber = [];
};

// request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

const PUBLIC_ROUTES = [
  API.auth.login,
  API.auth.forgotPassword,
  API.auth.resetPassword,
  API.auth.register,
];

// response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // If endpoint is PUBLIC → DO NOT refresh token
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      originalRequest.url?.includes(route)
    );

    if (isPublicRoute) {
      return Promise.reject(error); // pass original "Invalid OTP" error
    }

    // Skip login request itself
    if (originalRequest.url === API.auth.login) {
      return Promise.reject(error); // let your handleSubmit handle it
    }

    if (status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite loop
    if (originalRequest._retry) {
      useAuthStore.getState().logout();
      // localStorage.removeItem("token");
      // window.location.href = ROUTES.AUTH.LOGIN;
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // start refresh flow
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        // hit refresh token endpoint
        const refreshResponse = await axios.post(
          API.auth.refresh,
          {},
          { withCredentials: true } // if BE sends refresh cookie
        );

        const newToken = refreshResponse.data.token;

        // fetch user
        const meResponse = await api.get(API.auth.me);
        const refreshUser = meResponse.data;

        useAuthStore.getState().login(refreshUser, newToken);

        // localStorage.setItem("token", newToken);

        isRefreshing = false;
        onRefreshed(newToken);
      } catch (err) {
        isRefreshing = false;
        useAuthStore.getState().logout();
        // localStorage.removeItem("token");
        // window.location.href = ROUTES.AUTH.LOGIN;
        return Promise.reject(err);
      }
    }

    // queuq failed requests until refresh completes
    return new Promise((resolve) => {
      subscribeTokenRefresh((token: string) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(api(originalRequest));
      });
    });
  }
);

export default api;
