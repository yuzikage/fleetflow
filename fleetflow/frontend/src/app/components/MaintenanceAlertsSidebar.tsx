import { AlertTriangle, Gauge } from "lucide-react";
import { motion } from "motion/react";

interface MaintenanceAlert {
  vehicleId: string;
  vehiclePlate: string;
  message: string;
  severity: "high" | "medium" | "low";
  kmOverdue: number;
}

interface MaintenanceAlertsSidebarProps {
  alerts: MaintenanceAlert[];
}

export function MaintenanceAlertsSidebar({ alerts }: MaintenanceAlertsSidebarProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-[#EF4444]/20 border-[#EF4444]/40 text-[#EF4444]";
      case "medium":
        return "bg-[#F59E0B]/20 border-[#F59E0B]/40 text-[#F59E0B]";
      case "low":
        return "bg-[#3B82F6]/20 border-[#3B82F6]/40 text-[#3B82F6]";
      default:
        return "bg-white/10 border-white/20 text-gray-400";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] sticky top-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#EF4444]/20 rounded-lg">
          <AlertTriangle size={24} className="text-[#EF4444]" />
        </div>
        <div>
          <h2 className="text-white text-xl font-semibold">Maintenance Alerts</h2>
          <p className="text-gray-400 text-sm">{alerts.length} vehicles need attention</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.vehicleId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-4 rounded-lg border-2 transition-all hover:scale-[1.02]
              ${getSeverityColor(alert.severity)}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold font-mono">{alert.vehiclePlate}</h3>
              <span className="text-xs uppercase font-bold">{alert.severity}</span>
            </div>
            <p className="text-sm text-white/90 mb-3">{alert.message}</p>
            <div className="flex items-center gap-2 text-xs">
              <Gauge size={14} />
              <span>{alert.kmOverdue} km overdue</span>
            </div>
          </motion.div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gauge size={32} className="text-[#10B981]" />
            </div>
            <p className="text-gray-400 text-sm">All vehicles are up to date!</p>
            <p className="text-gray-500 text-xs mt-1">No maintenance alerts</p>
          </div>
        )}
      </div>
    </div>
  );
}
