import { useState } from "react";
import { Plus, Wrench, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface Vehicle {
  id: string;
  plate: string;
  status: string;
  lastServiceDate?: string;
  currentOdometer: number;
}

interface MaintenanceSchedulerFormProps {
  vehicles: Vehicle[];
  onSubmit: (maintenance: any) => void;
}

export function MaintenanceSchedulerForm({
  vehicles,
  onSubmit,
}: MaintenanceSchedulerFormProps) {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [costEstimate, setCostEstimate] = useState("");
  const [currentOdometer, setCurrentOdometer] = useState("");
  const [mechanicName, setMechanicName] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");

  const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle);

  const handleSubmit = () => {
    if (
      !selectedVehicle ||
      !serviceType ||
      !costEstimate ||
      !currentOdometer ||
      !mechanicName ||
      !estimatedDays
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const maintenance = {
      id: `MNT-${Math.floor(Math.random() * 9000) + 1000}`,
      vehicleId: selectedVehicle,
      vehiclePlate: selectedVehicleData?.plate,
      serviceType,
      costEstimate: parseFloat(costEstimate),
      currentOdometer: parseInt(currentOdometer),
      mechanicName,
      estimatedDays: parseInt(estimatedDays),
      startDate: new Date().toISOString().split("T")[0],
      status: "in-progress",
      progress: 0,
    };

    onSubmit(maintenance);

    // Reset form
    setSelectedVehicle("");
    setServiceType("");
    setCostEstimate("");
    setCurrentOdometer("");
    setMechanicName("");
    setEstimatedDays("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#F59E0B]/20 rounded-lg">
          <Wrench size={24} className="text-[#F59E0B]" />
        </div>
        <div>
          <h2 className="text-white text-xl font-semibold">Schedule Maintenance</h2>
          <p className="text-gray-400 text-sm">Log new service record</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Vehicle Selector */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Select Vehicle <span className="text-[#EF4444]">*</span>
          </label>
          <select
            value={selectedVehicle}
            onChange={(e) => {
              setSelectedVehicle(e.target.value);
              const vehicle = vehicles.find((v) => v.id === e.target.value);
              if (vehicle) {
                setCurrentOdometer(vehicle.currentOdometer.toString());
              }
            }}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#F59E0B] focus:border-2 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
          >
            <option value="" className="bg-[#1E293B]">
              Choose a vehicle
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id} className="bg-[#1E293B]">
                {vehicle.plate} - {vehicle.status}
              </option>
            ))}
          </select>
          {selectedVehicleData?.lastServiceDate && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <Calendar size={14} />
              <span>Last Service: {selectedVehicleData.lastServiceDate}</span>
            </div>
          )}
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Service Type <span className="text-[#EF4444]">*</span>
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#F59E0B] focus:border-2 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
          >
            <option value="" className="bg-[#1E293B]">
              Select service type
            </option>
            <option value="oil-change" className="bg-[#1E293B]">
              Oil Change
            </option>
            <option value="brake-check" className="bg-[#1E293B]">
              Brake Check
            </option>
            <option value="tire-rotation" className="bg-[#1E293B]">
              Tire Rotation
            </option>
            <option value="engine-repair" className="bg-[#1E293B]">
              Engine Repair
            </option>
            <option value="transmission-service" className="bg-[#1E293B]">
              Transmission Service
            </option>
            <option value="general-inspection" className="bg-[#1E293B]">
              General Inspection
            </option>
          </select>
        </div>

        {/* Mechanic Name */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Mechanic Name <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            value={mechanicName}
            onChange={(e) => setMechanicName(e.target.value)}
            placeholder="Enter mechanic name"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:border-2 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
          />
        </div>

        {/* Current Odometer */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Current Odometer <span className="text-[#EF4444]">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={currentOdometer}
              onChange={(e) => setCurrentOdometer(e.target.value)}
              placeholder="Enter odometer reading"
              className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:border-2 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              km
            </span>
          </div>
        </div>

        {/* Cost Estimate */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Cost Estimate <span className="text-[#EF4444]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={costEstimate}
              onChange={(e) => setCostEstimate(e.target.value)}
              placeholder="Enter estimated cost"
              className="w-full px-4 py-3 pl-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:border-2 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
            />
          </div>
        </div>

        {/* Estimated Days */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Estimated Days <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="number"
            value={estimatedDays}
            onChange={(e) => setEstimatedDays(e.target.value)}
            placeholder="Number of days"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] focus:border-2 focus:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>Schedule Service</span>
        </button>
      </div>
    </motion.div>
  );
}
