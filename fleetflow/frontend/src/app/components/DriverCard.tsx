import { SafetyScoreGauge } from "./SafetyScoreGauge";
import { Truck, Award, User, Phone } from "lucide-react";
import { motion } from "motion/react";

interface Driver {
  id: string;
  name: string;
  employeeId: string;
  safetyScore: number;
  tripsCompleted: number;
  yearsOfService: number;
  status: "on-duty" | "off-duty" | "suspended";
  licenseExpiry: string;
  phone: string;
  avatar?: string;
}

interface DriverCardProps {
  driver: Driver;
  onClick: () => void;
}

export function DriverCard({ driver, onClick }: DriverCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "on-duty":
        return {
          label: "On Duty",
          bg: "bg-[#3B82F6]/20",
          border: "border-[#3B82F6]/40",
          text: "text-[#3B82F6]",
          glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        };
      case "off-duty":
        return {
          label: "Off Duty",
          bg: "bg-gray-500/20",
          border: "border-gray-500/40",
          text: "text-gray-400",
          glow: "",
        };
      case "suspended":
        return {
          label: "Suspended",
          bg: "bg-[#EF4444]/20",
          border: "border-[#EF4444]/40",
          text: "text-[#EF4444]",
          glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
          stripes: true,
        };
      default:
        return {
          label: status,
          bg: "bg-white/10",
          border: "border-white/20",
          text: "text-gray-400",
          glow: "",
        };
    }
  };

  const statusConfig = getStatusConfig(driver.status);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={onClick}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer hover:scale-[1.02] duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-14 h-14 bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            {driver.avatar ? (
              <img src={driver.avatar} alt={driver.name} className="w-full h-full rounded-full" />
            ) : (
              <User size={24} className="text-white" />
            )}
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg">{driver.name}</h3>
            <p className="text-gray-400 text-sm font-mono">{driver.employeeId}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`
            px-3 py-1.5 rounded-full text-xs font-semibold border-2
            ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text} ${statusConfig.glow}
            ${
              statusConfig.stripes
                ? "bg-[repeating-linear-gradient(45deg,rgba(239,68,68,0.1),rgba(239,68,68,0.1)_10px,rgba(239,68,68,0.2)_10px,rgba(239,68,68,0.2)_20px)]"
                : ""
            }
          `}
        >
          {statusConfig.label}
        </div>
      </div>

      {/* Safety Score Gauge */}
      <div className="flex justify-center mb-6">
        <SafetyScoreGauge score={driver.safetyScore} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Truck size={16} className="text-[#3B82F6]" />
            <span className="text-gray-400 text-xs">Trips</span>
          </div>
          <p className="text-white text-xl font-bold">{driver.tripsCompleted}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award size={16} className="text-[#F59E0B]" />
            <span className="text-gray-400 text-xs">Years</span>
          </div>
          <p className="text-white text-xl font-bold">{driver.yearsOfService}</p>
        </div>
      </div>

      {/* Quick Action */}
      <a
        href={`tel:${driver.phone}`}
        onClick={(e) => e.stopPropagation()}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#10B981]/20 text-[#10B981] rounded-lg text-sm font-medium hover:bg-[#10B981]/30 transition-colors border border-[#10B981]/40"
      >
        <Phone size={16} />
        <span>Call Driver</span>
      </a>
    </motion.div>
  );
}
