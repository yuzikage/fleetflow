import { X, Phone, Mail, MapPin, Calendar, Shield, AlertCircle } from "lucide-react";
import { SafetyScoreGauge } from "./SafetyScoreGauge";
import { PerformanceChart } from "./PerformanceChart";
import { motion } from "motion/react";
import { useState } from "react";

interface Driver {
  id: string;
  name: string;
  employeeId: string;
  safetyScore: number;
  tripsCompleted: number;
  yearsOfService: number;
  status: "on-duty" | "off-duty" | "suspended";
  licenseExpiry: string;
  licenseNumber: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface DriverProfileModalProps {
  driver: Driver;
  onClose: () => void;
  onStatusChange: (driverId: string, newStatus: Driver["status"]) => void;
}

export function DriverProfileModal({ driver, onClose, onStatusChange }: DriverProfileModalProps) {
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false);

  const performanceData = [
    { month: "Sep", completionRate: 92, safetyScore: 88 },
    { month: "Oct", completionRate: 95, safetyScore: 91 },
    { month: "Nov", completionRate: 89, safetyScore: 85 },
    { month: "Dec", completionRate: 94, safetyScore: 92 },
    { month: "Jan", completionRate: 96, safetyScore: 95 },
    { month: "Feb", completionRate: 93, safetyScore: driver.safetyScore },
  ];

  const checkDriverEligibility = () => {
    const isExpired = new Date(driver.licenseExpiry) < new Date();
    const isSuspended = driver.status === "suspended";
    const isOffDuty = driver.status === "off-duty";

    if (isExpired) return { canDrive: false, reason: "License Expired" };
    if (isSuspended) return { canDrive: false, reason: "Driver Suspended" };
    if (isOffDuty) return { canDrive: false, reason: "Off Duty" };

    return { canDrive: true, reason: "" };
  };

  const eligibility = checkDriverEligibility();

  const handleStatusToggle = () => {
    const newStatus = driver.status === "on-duty" ? "off-duty" : "on-duty";
    onStatusChange(driver.id, newStatus);
  };

  const handleSuspend = () => {
    onStatusChange(driver.id, "suspended");
    setShowSuspendConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0F172A] border-2 border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white text-2xl font-bold mb-1">{driver.name}</h2>
              <p className="text-gray-400 font-mono">{driver.employeeId}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Eligibility Alert */}
          {!eligibility.canDrive && (
            <div className="bg-[#EF4444]/20 backdrop-blur-xl border-2 border-[#EF4444] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertCircle size={24} className="text-[#EF4444]" />
                <div>
                  <h3 className="text-white font-semibold">Driver Ineligible for Assignment</h3>
                  <p className="text-gray-300 text-sm">Reason: {eligibility.reason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Safety Score & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center">
              <SafetyScoreGauge score={driver.safetyScore} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-2">Trips Completed</p>
                <p className="text-white text-3xl font-bold">{driver.tripsCompleted}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-2">Years of Service</p>
                <p className="text-white text-3xl font-bold">{driver.yearsOfService}</p>
              </div>
              <div className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-2">License Expiry</p>
                <div className="flex items-center justify-between">
                  <p className="text-white text-lg font-semibold">{driver.licenseExpiry}</p>
                  <p className="text-gray-400 text-sm font-mono">{driver.licenseNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <PerformanceChart data={performanceData} />

          {/* Contact Information */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#3B82F6]" />
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="text-white font-medium">{driver.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#3B82F6]" />
                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="text-white font-medium">{driver.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <MapPin size={18} className="text-[#3B82F6]" />
                <div>
                  <p className="text-gray-400 text-xs">Address</p>
                  <p className="text-white font-medium">{driver.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className="bg-[#EF4444]/10 backdrop-blur-xl border-2 border-[#EF4444]/40 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={24} className="text-[#EF4444]" />
              <h3 className="text-white text-lg font-semibold">Emergency Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Blood Type</p>
                <p className="text-white font-bold text-xl">{driver.bloodType}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Emergency Contact</p>
                <p className="text-white font-medium">{driver.emergencyContact}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Emergency Phone</p>
                <p className="text-white font-medium">{driver.emergencyPhone}</p>
              </div>
            </div>
          </div>

          {/* Status Controls */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Status Management</h3>

            <div className="flex gap-3">
              {driver.status !== "suspended" && (
                <button
                  onClick={handleStatusToggle}
                  className={`
                    flex-1 py-3 px-4 rounded-lg font-semibold transition-all
                    ${
                      driver.status === "on-duty"
                        ? "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border border-gray-500/40"
                        : "bg-[#3B82F6]/20 text-[#3B82F6] hover:bg-[#3B82F6]/30 border border-[#3B82F6]/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    }
                  `}
                >
                  {driver.status === "on-duty" ? "Set Off Duty" : "Set On Duty"}
                </button>
              )}

              {driver.status !== "suspended" && (
                <button
                  onClick={() => setShowSuspendConfirm(true)}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold bg-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/30 transition-all border border-[#EF4444]/40"
                >
                  Suspend Driver
                </button>
              )}

              {driver.status === "suspended" && (
                <button
                  onClick={() => onStatusChange(driver.id, "off-duty")}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30 transition-all border border-[#10B981]/40"
                >
                  Lift Suspension
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Suspension Confirmation */}
        {showSuspendConfirm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0F172A] border-2 border-[#EF4444] rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-white text-xl font-bold mb-3">Confirm Suspension</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to suspend {driver.name}? This will immediately remove them
                from the available drivers pool and prevent trip assignments.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuspendConfirm(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSuspend}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-[#EF4444] hover:brightness-110 transition-all"
                >
                  Confirm Suspension
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
