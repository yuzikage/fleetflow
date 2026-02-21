import { Phone, CheckCircle, Navigation } from "lucide-react";
import { motion } from "motion/react";

interface Trip {
  id: string;
  cargoType: string;
  weight: number;
  destination: string;
  vehicleId: string;
  vehiclePlate?: string;
  driverId: string;
  driverName?: string;
  status: "draft" | "dispatched" | "in-progress" | "completed" | "cancelled";
  progress?: number;
  eta?: string;
}

interface TripCardProps {
  trip: Trip;
  onComplete: (id: string) => void;
  onContact: (id: string) => void;
  onReroute: (id: string) => void;
}

export function TripCard({ trip, onComplete, onContact, onReroute }: TripCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "dispatched":
        return "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30";
      case "in-progress":
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30";
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "cancelled":
        return "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30";
      default:
        return "bg-white/10 text-gray-400 border-white/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold mb-1">{trip.id}</h3>
          <p className="text-gray-400 text-sm capitalize">{trip.cargoType}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            trip.status
          )} capitalize`}
        >
          {trip.status === "in-progress" ? "In Progress" : trip.status}
        </span>
      </div>

      {/* Trip Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Driver</span>
          <span className="text-white font-medium">{trip.driverName || "N/A"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Vehicle</span>
          <span className="text-white font-mono">{trip.vehiclePlate || "N/A"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Destination</span>
          <span className="text-white truncate ml-2 max-w-[150px]">{trip.destination}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Weight</span>
          <span className="text-white">{trip.weight} kg</span>
        </div>
      </div>

      {/* Progress Bar */}
      {trip.status === "in-progress" && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Progress</span>
            <span>ETA: {trip.eta || "25 min"}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${trip.progress || 45}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 pt-4 border-t border-white/10">
        {trip.status === "in-progress" && (
          <>
            <button
              onClick={() => onComplete(trip.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#10B981]/20 text-[#10B981] rounded-lg text-sm font-medium hover:bg-[#10B981]/30 transition-colors"
              title="Mark as Completed"
            >
              <CheckCircle size={16} />
              <span className="hidden sm:inline">Complete</span>
            </button>
            <button
              onClick={() => onContact(trip.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg text-sm font-medium hover:bg-[#3B82F6]/30 transition-colors"
              title="Contact Driver"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">Contact</span>
            </button>
            <button
              onClick={() => onReroute(trip.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#F59E0B]/20 text-[#F59E0B] rounded-lg text-sm font-medium hover:bg-[#F59E0B]/30 transition-colors"
              title="Emergency Reroute"
            >
              <Navigation size={16} />
              <span className="hidden sm:inline">Reroute</span>
            </button>
          </>
        )}
        {trip.status === "dispatched" && (
          <div className="w-full text-center text-sm text-gray-400">
            Waiting for driver to start...
          </div>
        )}
      </div>
    </motion.div>
  );
}
