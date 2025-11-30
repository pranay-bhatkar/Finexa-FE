export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD:"/reset-password"
  },

  USER: {
    ROOT: "/user",
    DASHBOARD: "/user/dashboard",
    TRANSACTIONS: "/user/transactions",
    CATEGORIES: "/user/categories",
    PROFILE: "/user/profile",
    SETTINGS: "/user/settings",
    NOTIFICATIONS: "/user/notifications",
  },

  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    SETTINGS: "/admin/settings",
    PROFILE: "/admin/profile",
    NOTIFICATIONS: "/admin/notifications",
  },

  LANDING: "/",
  NOT_FOUND: "*",
};
