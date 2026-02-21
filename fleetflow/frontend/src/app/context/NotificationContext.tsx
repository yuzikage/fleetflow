import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Notification {
  id: string;
  type: "maintenance" | "expense" | "driver" | "trip" | "general";
  title: string;
  message: string;
  time: string;
  priority: "high" | "medium" | "low";
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("transcope_notifications");
    return saved ? JSON.parse(saved) : [
      {
        id: "notif-1",
        type: "maintenance",
        title: "Maintenance Alert",
        message: "TRK-9988 requires immediate service",
        time: "10 minutes ago",
        priority: "high",
        read: false,
        link: "/maintenance",
      },
      {
        id: "notif-2",
        type: "expense",
        title: "Budget Alert",
        message: "Fuel costs exceeded budget by 8%",
        time: "1 hour ago",
        priority: "medium",
        read: false,
        link: "/expenses",
      },
      {
        id: "notif-3",
        type: "driver",
        title: "Training Completed",
        message: "Driver VAN-2891 completed safety training",
        time: "2 hours ago",
        priority: "low",
        read: false,
        link: "/drivers",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("transcope_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notification: Omit<Notification, "id" | "time" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
