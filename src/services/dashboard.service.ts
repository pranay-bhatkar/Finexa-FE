import { API } from "@/config/api";
import api from "@/lib/axios";

// -------- Types --------
export interface MonthlySummary {
  totalIncome: number;
  totalExpense: number;
  savings: number;
}

export interface SpendingByCategory {
  categoryName: string;
  amount: number;
}

export interface TrendsItem {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface AdminDashboard {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  totalIncome: number;
  totalExpense: number;
  recurringPayments: number;
}

export interface Category {
  id: number;
  name: string;
  type: "EXPENSE" | "INCOME";
  icon?: string | null;
  color?: string | null;
  deleted: boolean;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: number;
  amount: number;
  month: number;
  year: number;
  categoryId: number;
  spent: number;
  remaining: number;
  userId: number;
}

// -------- Services --------
export const dashboardService = {
  getMonthlySummary: async (
    month: number,
    year: number
  ): Promise<MonthlySummary> => {
    const { data } = await api.get<{
      status: string;
      message: string;
      data: MonthlySummary;
    }>(`${API.analytics.monthlySummary}?month=${month}&year=${year}`);
    return data.data;
  },

  getSpendingByCategory: async (
    month: number,
    year: number
  ): Promise<SpendingByCategory[]> => {
    const { data } = await api.get<{
      status: string;
      message: string;
      data: SpendingByCategory[];
    }>(`${API.analytics.spendingByCategory}?month=${month}&year=${year}`);
    return data.data;
  },

  getTrends: async (monthsBack: number): Promise<TrendsItem[]> => {
    const { data } = await api.get<{
      status: string;
      message: string;
      data: TrendsItem[];
    }>(`${API.analytics.trends}?monthsBack=${monthsBack}`);
    return data.data;
  },

  getAdminDashboard: async (): Promise<AdminDashboard> => {
    const { data } = await api.get<AdminDashboard>(
      API.analytics.adminDashboard
    );
    return data;
  },

  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get<{
      status: string;
      message: string;
      data: Category[];
    }>(API.categories);
    return data.data;
  },

  getBudgets: async (): Promise<Budget[]> => {
    const { data } = await api.get<{
      status: string;
      message: string;
      data: Budget[];
    }>(API.budgets);
    return data.data;
  },
};
