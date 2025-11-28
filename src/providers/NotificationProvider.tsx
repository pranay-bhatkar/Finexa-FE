import { showSuccess } from "@/lib/toast";
import type { Notification } from "@/services/notification.service";
import { notificationService } from "@/services/notification.service";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useRef } from "react";

type NotificationContextValue = {
  notifications: Notification[];
  unreadCount: number;
  refetch: () => void;
  isLoading: boolean;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
  pollInterval?: number;
}> = ({
  children,
  pollInterval = 10000, // default 10s
}) => {
  const prevCountRef = useRef<number>(0);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getUnread,
    refetchInterval: pollInterval,
    refetchIntervalInBackground: false,
    staleTime: 5000,
  });

  // normalize to array safely
  const notifications: Notification[] = data?.data ?? [];
  const unreadCount = notifications.length;

  // detect new notification
  useEffect(() => {
    const prev = prevCountRef.current;
    if (unreadCount > prev) {
      // new notification arrived
      // show a toast (customize message or include count/title)
      showSuccess(
        `You have ${unreadCount} new notification${unreadCount > 1 ? "s" : ""}`
      );
    }
    prevCountRef.current = unreadCount;
  }, [unreadCount]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        refetch: () => void refetch(),
        isLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextValue => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  return ctx;
};
