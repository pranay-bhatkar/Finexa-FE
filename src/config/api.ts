export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// all api endpoints (centraliseauth apisd)
export const API = {
  /* -------------------------------- auth apis ------------------------------- */
  auth: {
    login: `${BASE_URL}/api/auth/login`, // post
    logout: `${BASE_URL}/api/auth/logout`, //post
    register: `${BASE_URL}/api/auth/register`, // post
    refresh: `${BASE_URL}/api/auth/refresh`, //post
    me: `${BASE_URL}/api/auth/me`, // get
    forgotPassword: `${BASE_URL}/api/auth/forgot-password`, // post
    resetPassword: `${BASE_URL}/api/auth/reset-password`, //post
  },

  /* ------------------------------- users papi ------------------------------- */

  //admin role only

  admin: {
    changeRoleByID: (id: number) => `${BASE_URL}/api/users/${id}/role`, // patch // ?role=
    adminDashboard: `${BASE_URL}/api/admin/analytics`,
    getAllUsers: `${BASE_URL}/api/admin`,
  },

  users: {
    saveUser: `${BASE_URL}/api/users`, // post
    getAllUsers: `${BASE_URL}/api/users`, //get params ->default=true ,page,size, soryby,,sordir (asc),
    getUserById: (id: number) => `${BASE_URL}/api/users/${id}`, // get
    fullupdate: (id: number) => `${BASE_URL}/api/users/${id}`, // put
    updateUserByID: (id: number) => `${BASE_URL}/api/users/${id}`, // patch
    deleteUserByID: (id: number) => `${BASE_URL}/api/users/${id}`, // delete
    deleteAllUsers: `${BASE_URL}/api/users`, // delete // reuired= alse
    updateProfile: `${BASE_URL}/api/users/me`, // patch
  },

  /* ---------------------------- transaction apis ---------------------------- */
  transactions: {
    addTransction: `${BASE_URL}/api/transactions`, // post
    update: (id: string) => `${BASE_URL}/api/transactions/${id}`, // put
    deleteTransactionById: (id: number) => `${BASE_URL}/api/transactions/${id}`, // soft delete
    getAllTransactions: `${BASE_URL}/api/transactions`, // get
    filterTransactionByType: `${BASE_URL}/api/transactions/filter/type`, // get , transaction type, page,size
    filterTransactionByDate: `${BASE_URL}/api/transactions/filter/type`, //get , start, end, page, size
    uploadTransactionReceipt: `${BASE_URL}/api/transactions/upload-receipt`, // post , multipart file, transaction id
  },

  /* ------------------------------ category apis ----------------------------- */
  categories: {
    createCategory: `${BASE_URL}/api/categories`, // post
    getAllCategories: `${BASE_URL}/api/categories`, // get
    updateCategoryById: (id: number) => `${BASE_URL}/api/categories/${id}`, // put
    deleteCategoryById: (id: number) => `${BASE_URL}/api/categories/${id}`, // delete
  },

  /* ------------------------------- reports api ------------------------------ */
  reports: {
    exportToCSV: `${BASE_URL}/api/reports/monthly/csv`, // get , month, year
    exportToEXCEL: `${BASE_URL}/api/reports/monthly/excel`, // get ,month, year
    exportToPDF: `${BASE_URL}/api/reports/monthly/pdf`, // get, month,year
    exportTohtmlPDF: `${BASE_URL}/api/reports`, // get, month, year
  },

  /* ------------------------ recurring transaction api ----------------------- */
  recurring: {
    addRecurringTransaction: `${BASE_URL}/api/recurring`, // post
    getAllRecurringTransctions: `${BASE_URL}/api/recurring`, //get
    deleteRecurringTransaction: (id: number) =>
      `${BASE_URL}/api/recurring/${id}`,
  },

  /* ---------------------------- notification apis --------------------------- */
  notification: {
    unread: `${BASE_URL}/api/notifications/unread`,
    markAsRead: (id: number) => `${BASE_URL}/api/notifications/read/${id}`,
    markAsAllRead: `${BASE_URL}/notifications/read-all`,
    delete: (id: number) => `${BASE_URL}/api/notifications/delete/${id}`,
  },

  /* ------------------------------- budget api ------------------------------- */
  budget: {
    createBudget: `${BASE_URL}/api/budgets`, //post
    getBudget: `${BASE_URL}/api.budgets`, // get , month, year (int)
    updateBudgetById: (id: number) => `${BASE_URL}/api/budgets/${id}`, // put
    deleteBudgetById: (id: number) => `${BASE_URL}/api/budgets/${id}`, // delete
    resetBudget: `${BASE_URL}/api/budgets/reset`, // post
  },

  /* ----------------------------- analytics apis ----------------------------- */
  analytics: {
    monthlySummary: `${BASE_URL}/api/analytics/monthly-summary`,
    spendingByCategory: `${BASE_URL}/api/analytics/spending-by-category`,
    trends: `${BASE_URL}/api/analytics/trends`,
  },

  budgets: `${BASE_URL}/api/budgets`,
};
