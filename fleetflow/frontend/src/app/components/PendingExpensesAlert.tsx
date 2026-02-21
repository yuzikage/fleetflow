import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface PendingTrip {
  id: string;
  vehiclePlate: string;
  destination: string;
  endedAt: string;
}

interface PendingExpensesAlertProps {
  pendingTrips: PendingTrip[];
}

export function PendingExpensesAlert({ pendingTrips }: PendingExpensesAlertProps) {
  if (pendingTrips.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#F59E0B]/10 backdrop-blur-xl border-2 border-[#F59E0B]/40 rounded-xl p-4 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#F59E0B]/30 rounded-lg">
          <AlertCircle size={24} className="text-[#F59E0B]" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">Pending Expense Logs</h3>
          <p className="text-gray-300 text-sm mb-3">
            {pendingTrips.length} trip{pendingTrips.length !== 1 ? "s" : ""} completed but expenses not logged
          </p>
          <div className="space-y-2">
            {pendingTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium text-sm">{trip.id}</p>
                  <p className="text-gray-400 text-xs">{trip.vehiclePlate} • {trip.destination}</p>
                </div>
                <span className="text-xs text-gray-400">{trip.endedAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
