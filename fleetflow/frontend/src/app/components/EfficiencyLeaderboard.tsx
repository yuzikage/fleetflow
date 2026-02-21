import { Trophy, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface VehicleEfficiency {
  vehicleId: string;
  plate: string;
  efficiency: number; // km/L
  trend: number; // percentage change
}

interface EfficiencyLeaderboardProps {
  topPerformers: VehicleEfficiency[];
  bottomPerformers: VehicleEfficiency[];
}

export function EfficiencyLeaderboard({
  topPerformers,
  bottomPerformers,
}: EfficiencyLeaderboardProps) {
  const VehicleRow = ({
    vehicle,
    rank,
    isTop,
  }: {
    vehicle: VehicleEfficiency;
    rank: number;
    isTop: boolean;
  }) => {
    const getRankColor = (rank: number) => {
      if (rank === 1) return "text-[#F59E0B]";
      if (rank === 2) return "text-[#9CA3AF]";
      if (rank === 3) return "text-[#CD7F32]";
      return "text-gray-500";
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: isTop ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: rank * 0.05 }}
        className={`
          flex items-center justify-between p-4 rounded-xl border transition-all
          ${
            isTop
              ? "bg-[#10B981]/10 border-[#10B981]/30 hover:bg-[#10B981]/20"
              : "bg-[#EF4444]/10 border-[#EF4444]/30 hover:bg-[#EF4444]/20"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center font-bold
              ${
                isTop
                  ? "bg-[#10B981]/20 text-[#10B981]"
                  : "bg-[#EF4444]/20 text-[#EF4444]"
              }
            `}
          >
            {rank}
          </div>
          <div>
            <p className="text-white font-semibold font-mono">{vehicle.plate}</p>
            <p className="text-gray-400 text-xs">{vehicle.vehicleId}</p>
          </div>
        </div>

        <div className="text-right">
          <p className={`text-xl font-bold ${isTop ? "text-[#10B981]" : "text-[#EF4444]"}`}>
            {vehicle.efficiency.toFixed(1)}{" "}
            <span className="text-sm text-gray-400">km/L</span>
          </p>
          <p
            className={`text-xs ${
              vehicle.trend >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
            }`}
          >
            {vehicle.trend >= 0 ? "↑" : "↓"} {Math.abs(vehicle.trend)}%
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <h2 className="text-white text-2xl font-bold mb-6">Efficiency Leaderboard</h2>

      {/* Top Performers */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={20} className="text-[#10B981]" />
          <h3 className="text-[#10B981] font-semibold">Top Performers</h3>
        </div>
        <div className="space-y-2">
          {topPerformers.map((vehicle, index) => (
            <VehicleRow
              key={vehicle.vehicleId}
              vehicle={vehicle}
              rank={index + 1}
              isTop={true}
            />
          ))}
        </div>
      </div>

      {/* Bottom Performers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-[#EF4444]" />
          <h3 className="text-[#EF4444] font-semibold">Fuel Guzzlers</h3>
        </div>
        <div className="space-y-2">
          {bottomPerformers.map((vehicle, index) => (
            <VehicleRow
              key={vehicle.vehicleId}
              vehicle={vehicle}
              rank={index + 1}
              isTop={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
