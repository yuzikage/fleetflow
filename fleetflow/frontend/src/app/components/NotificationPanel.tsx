import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router";
import { X, CheckCheck, Trash2, AlertCircle, DollarSign, Wrench, User, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, markAsRead, markAllAsRead, clearNotification, unreadCount } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return Wrench;
      case "expense":
        return DollarSign;
      case "driver":
        return User;
      case "trip":
        return MapPin;
      default:
        return AlertCircle;
    }
  };

  const getColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-[#EF4444]";
      case "medium":
        return "text-[#F59E0B]";
      default:
        return "text-[#10B981]";
    }
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full md:w-[450px] bg-[#0F172A] border-l border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 text-[#3B82F6] text-sm font-medium hover:underline"
                >
                  <CheckCheck size={16} />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle size={32} className="text-gray-600" />
                  </div>
                  <p className="text-gray-400 font-medium mb-1">No notifications</p>
                  <p className="text-gray-500 text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((notification) => {
                    const Icon = getIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${
                          notification.read
                            ? "bg-white/5 border-white/10"
                            : "bg-[#3B82F6]/10 border-[#3B82F6]/30"
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex gap-3">
                          <div className={`p-2 bg-white/5 rounded-lg ${getColor(notification.priority)}`}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="text-white font-semibold text-sm">
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1" />
                              )}
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                            <p className="text-gray-500 text-xs">{notification.time}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-[#EF4444]/20 hover:bg-[#EF4444]/30 border border-[#EF4444]/40 rounded-lg flex items-center justify-center transition-all"
                          >
                            <Trash2 size={14} className="text-[#EF4444]" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
