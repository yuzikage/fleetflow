import { NavLink, useNavigate } from "react-router";
import { useAuth, getRoleColor, getRoleDisplayName, UserRole } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { useState } from "react";
import { NotificationPanel } from "./NotificationPanel";
import {
  Truck,
  LayoutDashboard,
  MapPin,
  Wrench,
  DollarSign,
  Users,
  BarChart3,
  LogOut,
  Package,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Navigation configuration with role-based access
const NAV_LINKS = [
  { 
    path: "/dashboard", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    roles: ["MANAGER", "FINANCIAL_ANALYST"] as UserRole[]
  },
  { 
    path: "/inventory", 
    label: "Vehicle Registry", 
    icon: Package,
    roles: ["MANAGER", "DISPATCHER", "SAFETY_OFFICER"] as UserRole[]
  },
  { 
    path: "/trips", 
    label: "Trip Dispatcher", 
    icon: MapPin,
    roles: ["MANAGER", "DISPATCHER"] as UserRole[]
  },
  { 
    path: "/maintenance", 
    label: "Maintenance", 
    icon: Wrench,
    roles: ["MANAGER", "SAFETY_OFFICER"] as UserRole[]
  },
  { 
    path: "/expenses", 
    label: "Fuel & Expenses", 
    icon: DollarSign,
    roles: ["MANAGER", "DISPATCHER", "FINANCIAL_ANALYST"] as UserRole[]
  },
  { 
    path: "/drivers", 
    label: "Driver Safety", 
    icon: Users,
    roles: ["MANAGER", "SAFETY_OFFICER"] as UserRole[]
  },
  { 
    path: "/analytics", 
    label: "Analytics & ROI", 
    icon: BarChart3,
    roles: ["MANAGER", "FINANCIAL_ANALYST"] as UserRole[]
  },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter navigation items based on user role
  const filteredNavItems = NAV_LINKS.filter((link) =>
    user ? link.roles.includes(user.role) : false
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <Truck size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Transcope</h1>
              <p className="text-xs text-gray-400">Fleet Management</p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative w-full mt-4 flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
        >
          <Bell size={20} className="text-gray-400" />
          <span className="text-white font-medium">Notifications</span>
          {unreadCount > 0 && (
            <span className="ml-auto w-6 h-6 bg-[#EF4444] text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {filteredNavItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive
                      ? "bg-[#3B82F6] text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={20}
                      className={`transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{user?.name}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <span className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${getRoleColor(user?.role!)}`}>
            {user && getRoleDisplayName(user.role)}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#EF4444]/20 text-[#EF4444] rounded-xl font-semibold hover:bg-[#EF4444]/30 transition-all border border-[#EF4444]/40"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 w-12 h-12 bg-[#0F172A] border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
      >
        <Menu size={24} className="text-white" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 bg-[#0F172A] border-r border-white/10 flex-col h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-80 bg-[#0F172A] border-r border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] z-50 flex flex-col"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}