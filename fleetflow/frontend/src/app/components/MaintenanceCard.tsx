import { Calendar, User, Clock, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface MaintenanceCardProps {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  mechanicName: string;
  startDate: string;
  estimatedReleaseDate: string;
  serviceType: string;
  progress: number;
  onComplete: (id: string) => void;
}

export function MaintenanceCard({
  id,
  vehicleId,
  vehiclePlate,
  mechanicName,
  startDate,
  estimatedReleaseDate,
  serviceType,
  progress,
  onComplete,
}: MaintenanceCardProps) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)] min-w-[320px]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg mb-1">{vehiclePlate}</h3>
          <p className="text-gray-400 text-sm capitalize">{serviceType}</p>
        </div>
        <div className="flex items-center justify-center relative">
          {/* Circular Progress */}
          <svg className="w-20 h-20 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="40"
              cy="40"
              r="40"
              stroke="#F59E0B"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <User size={16} className="text-[#F59E0B]" />
          <span className="text-gray-400">Mechanic:</span>
          <span className="text-white font-medium ml-auto">{mechanicName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={16} className="text-[#F59E0B]" />
          <span className="text-gray-400">Started:</span>
          <span className="text-white ml-auto">{startDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-[#F59E0B]" />
          <span className="text-gray-400">Est. Release:</span>
          <span className="text-white ml-auto">{estimatedReleaseDate}</span>
        </div>
      </div>

      {/* Action Button */}
      {progress === 100 && (
        <button
          onClick={() => onComplete(id)}
          className="w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#10B981] to-[#059669] hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
        >
          <CheckCircle size={18} />
          <span>Release Vehicle</span>
        </button>
      )}
    </motion.div>
  );
}
