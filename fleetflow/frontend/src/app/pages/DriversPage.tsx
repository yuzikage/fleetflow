import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Shield, AlertCircle, FileText, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

export function DriversPage() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([
    { id: "DRV-001", name: "John Doe", safetyScore: 92, status: "Active", trips: 145, violations: 0 },
    { id: "DRV-002", name: "Jane Smith", safetyScore: 88, status: "Active", trips: 132, violations: 1 },
    { id: "DRV-003", name: "Bob Wilson", safetyScore: 45, status: "Suspended", trips: 89, violations: 8 },
    { id: "DRV-005", name: "Alice Chen", safetyScore: 78, status: "Active", trips: 98, violations: 2 },
    { id: "DRV-008", name: "Sarah Kim", safetyScore: 95, status: "Active", trips: 167, violations: 0 },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  const handleToggleSuspension = (driverId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Suspended" ? "Active" : "Suspended";
    setDrivers((prev) =>
      prev.map((d) => (d.id === driverId ? { ...d, status: newStatus } : d))
    );

    const driver = drivers.find((d) => d.id === driverId);
    toast.success(
      `${driver?.name} ${newStatus === "Suspended" ? "suspended" : "reactivated"}`,
      {
        description:
          newStatus === "Suspended"
            ? "Driver will not appear in trip dispatcher"
            : "Driver is now available for assignments",
      }
    );
  };

  const filteredDrivers = filterStatus === "all"
    ? drivers
    : drivers.filter((d) => d.status.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Driver Performance & Safety
          </h1>
          <p className="text-gray-400">Monitor driver compliance and safety scores ({drivers.length} drivers)</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white text-sm focus:outline-none focus:border-[#3B82F6]"
          >
            <option value="all" className="bg-[#0F172A]">All Drivers</option>
            <option value="active" className="bg-[#0F172A]">Active</option>
            <option value="suspended" className="bg-[#0F172A]">Suspended</option>
          </select>
          <button
            onClick={() => navigate("/drivers/compliance")}
            className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#059669] transition-all hover:scale-105"
          >
            <FileText size={20} />
            View Compliance
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <User className="text-[#3B82F6]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">Active</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Drivers</h3>
          <p className="text-3xl font-bold text-white">{drivers.filter((d) => d.status === "Active").length}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-[#10B981]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">+3.5%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Avg Safety Score</h3>
          <p className="text-3xl font-bold text-white">
            {(drivers.reduce((sum, d) => sum + d.safetyScore, 0) / drivers.length).toFixed(0)}%
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="text-[#F59E0B]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Last 30d</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Violations</h3>
          <p className="text-3xl font-bold text-white">
            {drivers.reduce((sum, d) => sum + d.violations, 0)}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Plus className="text-[#06B6D4]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">+15</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Trips</h3>
          <p className="text-3xl font-bold text-white">
            {drivers.reduce((sum, d) => sum + d.trips, 0)}
          </p>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver, index) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{driver.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-white font-semibold">{driver.name}</p>
                <p className="text-gray-400 text-sm font-mono">{driver.id}</p>
              </div>
            </div>

            {/* Safety Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">Safety Score</span>
                </div>
                <span
                  className={`font-bold ${
                    driver.safetyScore >= 80
                      ? "text-[#10B981]"
                      : driver.safetyScore >= 60
                      ? "text-[#F59E0B]"
                      : "text-[#EF4444]"
                  }`}
                >
                  {driver.safetyScore}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    driver.safetyScore >= 80
                      ? "bg-[#10B981]"
                      : driver.safetyScore >= 60
                      ? "bg-[#F59E0B]"
                      : "bg-[#EF4444]"
                  }`}
                  style={{ width: `${driver.safetyScore}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-gray-400 text-xs mb-1">Trips Completed</p>
                <p className="text-white font-bold text-lg">{driver.trips}</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-gray-400 text-xs mb-1">Violations</p>
                <p className={`font-bold text-lg ${driver.violations > 0 ? "text-[#EF4444]" : "text-[#10B981]"}`}>
                  {driver.violations}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                  driver.status === "Active"
                    ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40"
                    : "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40"
                }`}
              >
                {driver.status}
              </span>
            </div>

            {driver.safetyScore < 60 && (
              <div className="mb-4 p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-[#EF4444] mt-0.5" />
                  <p className="text-[#EF4444] text-xs">
                    Low safety score - review required
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => handleToggleSuspension(driver.id, driver.status)}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                driver.status === "Suspended"
                  ? "bg-[#10B981] text-white hover:bg-[#059669]"
                  : "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 hover:bg-[#EF4444]/30"
              }`}
            >
              {driver.status === "Suspended" ? "Reactivate Driver" : "Suspend Driver"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}