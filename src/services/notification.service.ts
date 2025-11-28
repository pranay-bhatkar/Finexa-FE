import { API } from "@/config/api";
import api from "@/lib/axios";

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationResponse {
  status: string;
  message: string;
  data: Notification[];
  statusCode?: number;
}

export interface BaseResponse {
  status: string;
  message: string;
  data?: unknown;
  statusCode?: number;
}

export const notificationService = {
  getUnread: async (): Promise<NotificationResponse> => {
    const { data } = await api.get<NotificationResponse>(
      API.notification.unread
    );
    return data;
  },

  markAsRead: async (id: number): Promise<BaseResponse> => {
    const { data } = await api.post<BaseResponse>(
      API.notification.markAsRead(id)
    );
    return data;
  },

  markAllAsRead: async (): Promise<BaseResponse> => {
    const { data } = await api.put<BaseResponse>(
      API.notification.markAsAllRead
    );
    return data;
  },

  //   getUnreadCount: async (): Promise<number> => {
  //     const { data } = await api.get<NotificationResponse>(
  //       API.notification.unread
  //     );
  //     return Array.isArray(data?.data) ? data.data.length : 0;
  //   },

  deleteNotificaion: async (id: number): Promise<BaseResponse> => {
    const { data } = await api.delete<BaseResponse>(
      API.notification.delete(id)
    );
    return data;
  },
};
