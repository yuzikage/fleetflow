import { useState } from "react";
import { SmartSelector } from "./SmartSelector";
import { Plus, Package } from "lucide-react";
import { motion } from "motion/react";

interface Vehicle {
  id: string;
  plate: string;
  capacity: number;
  status: "available" | "in-shop" | "on-trip";
}

interface Driver {
  id: string;
  name: string;
  license: string;
  licenseExpiry: string;
  status: "on-duty" | "off-duty";
}

interface TripCreationFormProps {
  vehicles: Vehicle[];
  drivers: Driver[];
  onSubmit: (trip: any) => void;
  onValidationError: (message: string) => void;
}

export function TripCreationForm({
  vehicles,
  drivers,
  onSubmit,
  onValidationError,
}: TripCreationFormProps) {
  const [tripId] = useState(`TRP-${Math.floor(Math.random() * 9000) + 1000}`);
  const [cargoType, setCargoType] = useState("");
  const [weight, setWeight] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [weightError, setWeightError] = useState(false);

  const validateTrip = () => {
    // Reset errors
    setWeightError(false);

    // Check all fields
    if (!cargoType || !weight || !destination || !selectedVehicle || !selectedDriver) {
      onValidationError("Please fill in all required fields");
      return false;
    }

    const cargoWeight = parseFloat(weight);
    const vehicle = vehicles.find((v) => v.id === selectedVehicle);
    const driver = drivers.find((d) => d.id === selectedDriver);

    // Check vehicle capacity
    if (vehicle && cargoWeight > vehicle.capacity) {
      setWeightError(true);
      const excess = cargoWeight - vehicle.capacity;
      onValidationError(
        `Weight exceeds Vehicle Capacity by ${excess.toFixed(0)}kg. Selected vehicle can only carry ${vehicle.capacity}kg.`
      );
      return false;
    }

    // Check driver license expiry
    if (driver && new Date(driver.licenseExpiry) < new Date()) {
      onValidationError("Selected driver's license has expired!");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateTrip()) return;

    const trip = {
      id: tripId,
      cargoType,
      weight: parseFloat(weight),
      destination,
      vehicleId: selectedVehicle,
      driverId: selectedDriver,
      status: "dispatched",
      createdAt: new Date().toISOString(),
    };

    onSubmit(trip);

    // Reset form
    setCargoType("");
    setWeight("");
    setDestination("");
    setSelectedVehicle("");
    setSelectedDriver("");
    setWeightError(false);
  };

  const vehicleOptions = vehicles.map((v) => ({
    id: v.id,
    label: v.plate,
    subtext: `Cap: ${v.capacity}kg`,
    available: v.status === "available",
    capacity: v.capacity,
  }));

  const driverOptions = drivers.map((d) => ({
    id: d.id,
    label: d.name,
    subtext: `License: ${d.license}`,
    available: d.status === "on-duty" && new Date(d.licenseExpiry) > new Date(),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] sticky top-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#3B82F6]/20 rounded-lg">
          <Package size={24} className="text-[#3B82F6]" />
        </div>
        <div>
          <h2 className="text-white text-xl font-semibold">New Dispatch</h2>
          <p className="text-gray-400 text-sm">Trip ID: {tripId}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Cargo Type */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Cargo Type <span className="text-[#EF4444]">*</span>
          </label>
          <select
            value={cargoType}
            onChange={(e) => setCargoType(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          >
            <option value="" className="bg-[#1E293B]">Select cargo type</option>
            <option value="electronics" className="bg-[#1E293B]">Electronics</option>
            <option value="medical" className="bg-[#1E293B]">Medical Supplies</option>
            <option value="food" className="bg-[#1E293B]">Food & Beverages</option>
            <option value="industrial" className="bg-[#1E293B]">Industrial Equipment</option>
            <option value="general" className="bg-[#1E293B]">General Cargo</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Weight <span className="text-[#EF4444]">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setWeightError(false);
              }}
              placeholder="Enter weight"
              className={`
                w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-xl border rounded-lg
                text-white placeholder-gray-500 transition-all duration-300 outline-none
                ${
                  weightError
                    ? "border-[#EF4444] border-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                    : "border-white/10 focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                }
              `}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              kg
            </span>
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Destination <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination address"
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
        </div>

        {/* Assign Vehicle */}
        <SmartSelector
          label="Assign Vehicle"
          value={selectedVehicle}
          onChange={setSelectedVehicle}
          options={vehicleOptions}
          placeholder="Select available vehicle"
        />

        {/* Assign Driver */}
        <SmartSelector
          label="Assign Driver"
          value={selectedDriver}
          onChange={setSelectedDriver}
          options={driverOptions}
          placeholder="Select on-duty driver"
        />

        {/* Dispatch Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>Dispatch Trip</span>
        </button>
      </div>
    </motion.div>
  );
}
