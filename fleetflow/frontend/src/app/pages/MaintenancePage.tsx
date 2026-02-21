import { useState } from "react";
import { Wrench, AlertCircle, Plus, Calendar } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useNotifications } from "../context/NotificationContext";

export function MaintenancePage() {
  const { addNotification } = useNotifications();
  const [vehicles, setVehicles] = useState([
    { id: "VEH-004", plate: "VAN-3421", status: "In Shop", health: 45, issue: "Engine repair", estimatedDays: 3 },
    { id: "VEH-010", plate: "TRK-9988", status: "In Shop", health: 32, issue: "Transmission issue", estimatedDays: 5 },
  ]);

  const [scheduledMaintenance, setScheduledMaintenance] = useState([
    { id: "MAINT-001", vehicleId: "VEH-002", plate: "VAN-2891", type: "Oil Change", date: "2026-02-25", priority: "low" },
    { id: "MAINT-002", vehicleId: "VEH-005", plate: "TRK-1456", type: "Brake Inspection", date: "2026-02-23", priority: "high" },
  ]);

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    vehicle: "",
    type: "",
    date: "",
    priority: "medium",
  });

  const availableVehicles = [
    { id: "VEH-001", plate: "BIKE-1122" },
    { id: "VEH-002", plate: "VAN-2891" },
    { id: "VEH-003", plate: "TRK-1456" },
    { id: "VEH-005", plate: "TRK-9988" },
  ];

  const maintenanceTypes = [
    "Oil Change",
    "Tire Rotation",
    "Brake Inspection",
    "Engine Service",
    "Transmission Service",
    "General Inspection",
  ];

  const handleMarkAvailable = (vehicleId: string, plate: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    
    toast.success(`${plate} marked as available and returned to fleet!`, {
      description: "Dispatcher has been notified",
    });

    addNotification({
      type: "maintenance",
      title: "Vehicle Ready",
      message: `${plate} has been serviced and is ready for dispatch`,
      priority: "low",
      link: "/trips",
    });
  };

  const handleScheduleMaintenance = () => {
    if (!scheduleForm.vehicle || !scheduleForm.type || !scheduleForm.date) {
      toast.error("Please fill all fields");
      return;
    }

    const vehicle = availableVehicles.find((v) => v.id === scheduleForm.vehicle);
    const newSchedule = {
      id: `MAINT-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      vehicleId: scheduleForm.vehicle,
      plate: vehicle?.plate || "",
      type: scheduleForm.type,
      date: scheduleForm.date,
      priority: scheduleForm.priority,
    };

    setScheduledMaintenance([...scheduledMaintenance, newSchedule]);
    toast.success("Maintenance scheduled successfully!");

    setScheduleForm({ vehicle: "", type: "", date: "", priority: "medium" });
    setShowScheduleForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40";
      case "medium":
        return "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40";
      default:
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40";
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Maintenance & Service Center</h1>
          <p className="text-gray-400">Monitor vehicle health and service status</p>
        </div>
        <button
          onClick={() => setShowScheduleForm(!showScheduleForm)}
          className="flex items-center gap-2 bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2563EB] transition-all hover:scale-105"
        >
          <Plus size={20} />
          Schedule Maintenance
        </button>
      </div>

      {/* Schedule Form */}
      {showScheduleForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Schedule New Maintenance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={scheduleForm.vehicle}
              onChange={(e) => setScheduleForm({ ...scheduleForm, vehicle: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="">Select Vehicle</option>
              {availableVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id} className="bg-[#0F172A]">
                  {vehicle.plate}
                </option>
              ))}
            </select>

            <select
              value={scheduleForm.type}
              onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="">Maintenance Type</option>
              {maintenanceTypes.map((type) => (
                <option key={type} value={type} className="bg-[#0F172A]">
                  {type}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={scheduleForm.date}
              onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6]"
            />

            <select
              value={scheduleForm.priority}
              onChange={(e) => setScheduleForm({ ...scheduleForm, priority: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="low" className="bg-[#0F172A]">Low Priority</option>
              <option value="medium" className="bg-[#0F172A]">Medium Priority</option>
              <option value="high" className="bg-[#0F172A]">High Priority</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleScheduleMaintenance}
              className="bg-[#10B981] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#059669] transition-all"
            >
              Schedule
            </button>
            <button
              onClick={() => setShowScheduleForm(false)}
              className="bg-white/5 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Scheduled Maintenance Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Scheduled Maintenance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-semibold">ID</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Vehicle</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Type</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Date</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {scheduledMaintenance.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="p-4 text-white font-mono">{item.id}</td>
                  <td className="p-4 text-white font-semibold">{item.plate}</td>
                  <td className="p-4 text-gray-400">{item.type}</td>
                  <td className="p-4 text-gray-400 flex items-center gap-2">
                    <Calendar size={14} />
                    {item.date}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(item.priority)}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicles in Shop */}
      <h2 className="text-xl font-bold text-white mb-4">Vehicles in Shop</h2>
      {vehicles.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench size={32} className="text-gray-600" />
          </div>
          <p className="text-gray-400 font-medium mb-1">No vehicles in maintenance</p>
          <p className="text-gray-500 text-sm">All vehicles are in good condition</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-semibold font-mono text-lg">{vehicle.plate}</p>
                  <p className="text-gray-400 text-sm">{vehicle.id}</p>
                </div>
                <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] rounded-lg text-xs font-semibold">
                  {vehicle.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Health Score</span>
                  <span
                    className={`font-bold ${
                      vehicle.health > 70
                        ? "text-[#10B981]"
                        : vehicle.health > 40
                        ? "text-[#F59E0B]"
                        : "text-[#EF4444]"
                    }`}
                  >
                    {vehicle.health}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      vehicle.health > 70
                        ? "bg-[#10B981]"
                        : vehicle.health > 40
                        ? "bg-[#F59E0B]"
                        : "bg-[#EF4444]"
                    }`}
                    style={{ width: `${vehicle.health}%` }}
                  />
                </div>
              </div>

              <div className="mb-4 p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle size={16} className="text-[#EF4444] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">Issue</p>
                    <p className="text-gray-400 text-xs">{vehicle.issue}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs">Estimated completion: {vehicle.estimatedDays} days</p>
              </div>

              <button
                onClick={() => handleMarkAvailable(vehicle.id, vehicle.plate)}
                className="w-full bg-[#10B981] text-white py-3 rounded-xl font-semibold hover:bg-[#059669] transition-all flex items-center justify-center gap-2"
              >
                <Wrench size={18} />
                Mark as Available
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}