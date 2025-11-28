import ConfirmationModal from "@/components/common/modal/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showSuccess } from "@/lib/toast";
import {
  notificationService,
  type NotificationResponse,
} from "@/services/notification.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Loader2 } from "lucide-react";
import { useState } from "react";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<NotificationResponse>({
    queryKey: ["notifications"],
    queryFn: notificationService.getUnread,
  });

  const [selectedNotification, setSelectedNotification] = useState<
    number | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  //   const markOne = useMutation({
  //     mutationFn: (id: number) => notificationService.markAsRead(id),
  //     onSuccess: () =>
  //       queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  //   });

  const markAll = useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const deleteNotification = useMutation({
    mutationFn: (id: number) => notificationService.deleteNotificaion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      showSuccess("Notification deleted");
    },
  });

  const notifications = data?.data ?? [];

  const handleDeleteClick = (id: number) => {
    setSelectedNotification(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedNotification) {
      deleteNotification.mutate(selectedNotification);
    }
    setModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#0A0F29]">Notifications</h1>

        {notifications.length > 0 && (
          <Button
            onClick={() => markAll.mutate()}
            disabled={markAll.isPending}
            className="bg-[#4EF1C7] text-[#0A0F29] hover:bg-[#26C19F]"
          >
            {markAll.isPending ? "Marking..." : "Mark All Read"}
          </Button>
        )}
      </div>

      {/* Notification List */}
      <Card className="border border-gray-200 shadow-sm rounded-2xl">
        <CardContent className="p-0">
          <div className="h-[70vh]">
            <ScrollArea className="h-full">
              {isPending ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="animate-spin w-6 h-6 text-[#4EF1C7]" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-gray-500 space-y-2">
                  <Bell className="w-8 h-8" />
                  <p>No new notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 flex justify-between items-start hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-medium text-[#0A0F29]">{n.title}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          {n.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markOne.mutate(n.id)}
                        disabled={markOne.isPending}
                        className="border-[#4EF1C7] text-[#0A0F29] hover:bg-[#4EF1C7]/20 rounded-xl cursor-pointer"
                      >
                        Mark Read
                      </Button> */}

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(n.id)}
                        disabled={deleteNotification.isPending}
                        className="border-2 border-red-400 text-[#0A0F29] hover:bg-red-400/60 rounded-xl cursor-pointer"
                      >
                        Delete
                      </Button>

                      <ConfirmationModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={handleConfirmDelete}
                        title="Delete Notification"
                        message="Are you sure you want to delete this notification?"
                      />
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
