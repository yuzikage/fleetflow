import { AlertTriangle, Calendar, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface ComplianceItem {
  driverId: string;
  driverName: string;
  employeeId: string;
  licenseExpiry: string;
  daysRemaining: number;
}

interface ComplianceMonitorProps {
  items: ComplianceItem[];
}

export function ComplianceMonitor({ items }: ComplianceMonitorProps) {
  const getDaysRemaining = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyLevel = (days: number) => {
    if (days < 0) return "expired";
    if (days <= 30) return "urgent";
    if (days <= 60) return "warning";
    return "normal";
  };

  const sortedItems = items
    .map((item) => ({
      ...item,
      daysRemaining: getDaysRemaining(item.licenseExpiry),
    }))
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  const upcomingExpirations = sortedItems.filter((item) => item.daysRemaining <= 60);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#F59E0B]/20 rounded-lg">
          <Calendar size={24} className="text-[#F59E0B]" />
        </div>
        <div>
          <h2 className="text-white text-xl font-semibold">Compliance Monitor</h2>
          <p className="text-gray-400 text-sm">
            {upcomingExpirations.length} license{upcomingExpirations.length !== 1 ? "s" : ""}{" "}
            expiring soon
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {upcomingExpirations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={32} className="text-[#10B981]" />
            </div>
            <p className="text-gray-400 text-sm">All licenses are valid</p>
            <p className="text-gray-500 text-xs mt-1">No upcoming expirations</p>
          </div>
        )}

        {upcomingExpirations.map((item, index) => {
          const urgency = getUrgencyLevel(item.daysRemaining);
          const progress = Math.max(0, Math.min(100, (item.daysRemaining / 60) * 100));

          return (
            <motion.div
              key={item.driverId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 rounded-xl border-2 transition-all
                ${
                  urgency === "expired"
                    ? "bg-[#EF4444]/20 border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    : urgency === "urgent"
                    ? "bg-[#F59E0B]/20 border-[#F59E0B] animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    : urgency === "warning"
                    ? "bg-[#F59E0B]/10 border-[#F59E0B]/40"
                    : "bg-white/5 border-white/10"
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{item.driverName}</h3>
                  <p className="text-gray-400 text-sm font-mono">{item.employeeId}</p>
                </div>

                <div className="flex items-center gap-2">
                  {urgency === "expired" && (
                    <AlertTriangle size={20} className="text-[#EF4444]" />
                  )}
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-bold
                      ${
                        urgency === "expired"
                          ? "bg-[#EF4444] text-white"
                          : urgency === "urgent"
                          ? "bg-[#F59E0B] text-white"
                          : "bg-white/20 text-gray-300"
                      }
                    `}
                  >
                    {item.daysRemaining < 0
                      ? "EXPIRED"
                      : `${item.daysRemaining} days`}
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>License Expiry</span>
                  <span>{item.licenseExpiry}</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      urgency === "expired"
                        ? "bg-[#EF4444]"
                        : urgency === "urgent"
                        ? "bg-[#F59E0B]"
                        : "bg-[#3B82F6]"
                    }`}
                    style={{ width: `${item.daysRemaining < 0 ? 0 : progress}%` }}
                  />
                </div>
              </div>

              {urgency === "expired" && (
                <p className="text-[#EF4444] text-xs font-semibold mt-2">
                  ⚠️ Driver cannot be assigned to trips
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5);
        }
      `}</style>
    </div>
  );
}
