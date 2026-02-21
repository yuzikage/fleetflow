import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, ArrowRight, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth, UserRole, getRoleDisplayName } from "../context/AuthContext";

interface ForbiddenModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo: string;
}

// Domain-specific permission explanations
const getDomainExplanation = (userRole: UserRole, attemptedPath: string): { title: string; explanation: string } => {
  const roleExplanations: Record<UserRole, Record<string, { title: string; explanation: string }>> = {
    MANAGER: {
      default: {
        title: "Full Access Granted",
        explanation: "As a Fleet Manager, you have access to all system features.",
      },
    },
    DISPATCHER: {
      "/analytics": {
        title: "Financial Analytics Restricted",
        explanation: "Financial analytics and ROI reports are reserved for Financial Analysts and Fleet Managers. Your role focuses on trip management and operational dispatch.",
      },
      "/maintenance": {
        title: "Maintenance Center Restricted",
        explanation: "Vehicle maintenance and service tracking is managed by Safety Officers and Fleet Managers. You can view vehicle availability in the Trip Dispatcher.",
      },
      "/drivers/compliance": {
        title: "Compliance Dashboard Restricted",
        explanation: "Driver compliance and certification tracking is exclusively managed by Safety Officers to ensure regulatory oversight.",
      },
      default: {
        title: "Domain Restricted",
        explanation: "This area is outside your operational domain. Dispatchers manage trips, cargo, and delivery logistics.",
      },
    },
    SAFETY_OFFICER: {
      "/analytics": {
        title: "Financial Analytics Restricted",
        explanation: "Revenue and ROI analytics are managed by Financial Analysts. Your dashboard focuses on fleet safety scores and compliance metrics.",
      },
      "/trips": {
        title: "Trip Dispatch Restricted",
        explanation: "Trip creation and dispatch operations are managed by Dispatchers. You can access driver assignments through the Driver Safety hub.",
      },
      "/trips/create": {
        title: "Trip Creation Restricted",
        explanation: "Only Dispatchers can create and schedule new trips. Your role focuses on driver safety and vehicle compliance.",
      },
      "/expenses": {
        title: "Expense Management Restricted",
        explanation: "Fuel and expense logging is handled by Dispatchers and Financial Analysts. You can view maintenance costs in the Safety Dashboard.",
      },
      default: {
        title: "Domain Restricted",
        explanation: "This area is outside your safety and compliance domain. Safety Officers manage driver certifications and vehicle inspections.",
      },
    },
    FINANCIAL_ANALYST: {
      "/trips": {
        title: "Trip Dispatch Restricted",
        explanation: "Operational trip management is handled by Dispatchers. You can view revenue from completed trips in the Analytics dashboard.",
      },
      "/trips/create": {
        title: "Trip Creation Restricted",
        explanation: "Only Dispatchers can create new trips. Your role focuses on financial analysis and cost optimization.",
      },
      "/maintenance": {
        title: "Maintenance Operations Restricted",
        explanation: "Vehicle maintenance is managed by Safety Officers. You can view maintenance ROI and cost analysis in your Financial Dashboard.",
      },
      "/drivers": {
        title: "Driver Management Restricted",
        explanation: "Driver assignments and safety compliance are managed by Safety Officers. You can view payroll costs in the Expenses section.",
      },
      "/drivers/compliance": {
        title: "Compliance Dashboard Restricted",
        explanation: "Driver compliance tracking is exclusively managed by Safety Officers for regulatory oversight.",
      },
      "/inventory": {
        title: "Vehicle Registry Restricted",
        explanation: "Fleet inventory is managed by Dispatchers and Safety Officers. You can view asset utilization in the Analytics dashboard.",
      },
      default: {
        title: "Domain Restricted",
        explanation: "This area is outside your financial analysis domain. Financial Analysts focus on revenue, costs, and ROI metrics.",
      },
    },
  };

  const roleConfig = roleExplanations[userRole];
  return roleConfig[attemptedPath] || roleConfig.default;
};

export function ForbiddenModal({ isOpen, onClose, redirectTo }: ForbiddenModalProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentPath = window.location.pathname;

  const domainInfo = user ? getDomainExplanation(user.role, currentPath) : { title: "Access Restricted", explanation: "You don't have permission to access this area." };

  useEffect(() => {
    if (isOpen) {
      // Auto-redirect after 5 seconds
      const timer = setTimeout(() => {
        handleRedirect();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, redirectTo]);

  const handleRedirect = () => {
    onClose();
    navigate(redirectTo);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0F172A] border border-[#EF4444]/30 rounded-2xl shadow-[0_20px_100px_rgba(239,68,68,0.3)] overflow-hidden"
            >
              {/* Header with animated icon */}
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center mb-6"
                >
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#EF4444] rounded-full blur-2xl opacity-40 animate-pulse" />
                    
                    {/* Icon */}
                    <ShieldAlert 
                      size={80} 
                      className="relative text-[#EF4444] drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]" 
                      strokeWidth={2}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Lock size={20} className="text-[#EF4444]" />
                    <h2 className="text-2xl font-bold text-white">
                      {domainInfo.title}
                    </h2>
                  </div>
                  
                  {/* Role Badge */}
                  {user && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg mb-4">
                      <span className="text-gray-400 text-sm">Your Role:</span>
                      <span className="text-white font-semibold text-sm">{getRoleDisplayName(user.role)}</span>
                    </div>
                  )}

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {domainInfo.explanation}
                  </p>

                  {/* Permissions Box */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 text-left">
                    <p className="text-gray-400 text-xs font-semibold mb-2">YOUR AUTHORIZED AREAS:</p>
                    <div className="space-y-1">
                      {user?.role === "DISPATCHER" && (
                        <>
                          <p className="text-white text-sm">✓ Trip Dispatcher</p>
                          <p className="text-white text-sm">✓ Vehicle Registry</p>
                          <p className="text-white text-sm">✓ Fuel & Expenses</p>
                        </>
                      )}
                      {user?.role === "SAFETY_OFFICER" && (
                        <>
                          <p className="text-white text-sm">✓ Driver Safety & Compliance</p>
                          <p className="text-white text-sm">✓ Maintenance Center</p>
                          <p className="text-white text-sm">✓ Vehicle Registry</p>
                        </>
                      )}
                      {user?.role === "FINANCIAL_ANALYST" && (
                        <>
                          <p className="text-white text-sm">✓ Analytics & ROI</p>
                          <p className="text-white text-sm">✓ Fuel & Expenses</p>
                          <p className="text-white text-sm">✓ Financial Dashboard</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Auto-redirect indicator */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 text-[#3B82F6] mb-3">
                      <span className="text-sm font-medium">Redirecting automatically...</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#EF4444] to-[#F59E0B] rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRedirect}
                    className="w-full bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white py-3 rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(239,68,68,0.4)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Go to My Dashboard
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}