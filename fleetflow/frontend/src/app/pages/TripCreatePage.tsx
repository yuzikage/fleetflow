import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useFleetData } from "../context/FleetDataContext";
import { MapPin, Truck, User, Package, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function TripCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTripUpdate } = useFleetData();
  
  const preloadedCargo = location.state?.cargo;

  const [formData, setFormData] = useState({
    cargoId: preloadedCargo?.id || "",
    origin: preloadedCargo?.origin || "",
    destination: preloadedCargo?.destination || "",
    weight: preloadedCargo?.weight || "",
    vehicleId: "",
    driverId: "",
    priority: preloadedCargo?.priority || "medium",
    scheduledDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Available vehicles (only Available status)
  const availableVehicles = [
    { id: "VEH-001", plate: "BIKE-1122", type: "Motorcycle", capacity: 50 },
    { id: "VEH-003", plate: "TRK-1456", type: "Truck", capacity: 5000 },
    { id: "VEH-005", plate: "TRK-9988", type: "Truck", capacity: 5000 },
    { id: "VEH-007", plate: "VAN-5634", type: "Van", capacity: 1500 },
  ];

  // Available drivers (only Active status)
  const availableDrivers = [
    { id: "DRV-001", name: "John Doe", rating: 4.8 },
    { id: "DRV-002", name: "Jane Smith", rating: 4.9 },
    { id: "DRV-003", name: "Bob Wilson", rating: 4.7 },
    { id: "DRV-008", name: "Sarah Kim", rating: 4.6 },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.origin.trim()) newErrors.origin = "Origin is required";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required";
    if (!formData.weight || parseFloat(formData.weight) <= 0) newErrors.weight = "Valid weight is required";
    if (!formData.vehicleId) newErrors.vehicleId = "Vehicle selection is required";
    if (!formData.driverId) newErrors.driverId = "Driver selection is required";
    if (!formData.scheduledDate) newErrors.scheduledDate = "Schedule date is required";

    // Validate weight vs vehicle capacity
    if (formData.weight && formData.vehicleId) {
      const selectedVehicle = availableVehicles.find((v) => v.id === formData.vehicleId);
      if (selectedVehicle && parseFloat(formData.weight) > selectedVehicle.capacity) {
        newErrors.weight = `Weight exceeds vehicle capacity (${selectedVehicle.capacity} kg)`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    const selectedVehicle = availableVehicles.find((v) => v.id === formData.vehicleId);
    const selectedDriver = availableDrivers.find((d) => d.id === formData.driverId);

    const tripId = `TRP-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;

    // Add trip update to fleet data context
    addTripUpdate({
      id: tripId,
      status: "Scheduled",
    });

    toast.success("Trip created successfully!", {
      description: `${tripId} scheduled for ${formData.scheduledDate}`,
    });

    // Navigate back to trips page
    setTimeout(() => {
      navigate("/trips", {
        state: {
          newTrip: {
            id: tripId,
            vehicle: selectedVehicle?.plate,
            driver: selectedDriver?.name,
            origin: formData.origin,
            destination: formData.destination,
            status: "Scheduled",
          },
        },
      });
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/trips")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Trips
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <MapPin size={32} className="text-[#3B82F6]" />
              Create New Trip
            </h1>
            <p className="text-gray-400">Dispatcher exclusive: Schedule and assign new delivery trips</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cargo Details */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Package size={20} />
                Cargo Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Cargo ID</label>
                  <input
                    type="text"
                    value={formData.cargoId}
                    onChange={(e) => handleChange("cargoId", e.target.value)}
                    placeholder="Optional"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Weight (kg) *</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    placeholder="e.g., 1500"
                    className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                      errors.weight
                        ? "border-[#EF4444] focus:border-[#EF4444]"
                        : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    }`}
                  />
                  {errors.weight && <p className="text-[#EF4444] text-xs mt-1">{errors.weight}</p>}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Origin *</label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => handleChange("origin", e.target.value)}
                    placeholder="Pickup location"
                    className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                      errors.origin
                        ? "border-[#EF4444] focus:border-[#EF4444]"
                        : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    }`}
                  />
                  {errors.origin && <p className="text-[#EF4444] text-xs mt-1">{errors.origin}</p>}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Destination *</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleChange("destination", e.target.value)}
                    placeholder="Delivery location"
                    className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                      errors.destination
                        ? "border-[#EF4444] focus:border-[#EF4444]"
                        : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    }`}
                  />
                  {errors.destination && <p className="text-[#EF4444] text-xs mt-1">{errors.destination}</p>}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                  >
                    <option value="low" className="bg-[#0F172A]">Low</option>
                    <option value="medium" className="bg-[#0F172A]">Medium</option>
                    <option value="high" className="bg-[#0F172A]">High</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Scheduled Date *</label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={(e) => handleChange("scheduledDate", e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all ${
                      errors.scheduledDate
                        ? "border-[#EF4444] focus:border-[#EF4444]"
                        : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    }`}
                  />
                  {errors.scheduledDate && <p className="text-[#EF4444] text-xs mt-1">{errors.scheduledDate}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="text-gray-400 text-sm mb-2 block">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Special instructions or notes..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all resize-none"
                />
              </div>
            </div>

            {/* Assignment */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Assignment</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                    <Truck size={16} />
                    Select Vehicle *
                  </label>
                  <select
                    value={formData.vehicleId}
                    onChange={(e) => handleChange("vehicleId", e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all ${
                      errors.vehicleId
                        ? "border-[#EF4444] focus:border-[#EF4444]"
                        : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    }`}
                  >
                    <option value="" className="bg-[#0F172A]">Choose a vehicle...</option>
                    {availableVehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id} className="bg-[#0F172A]">
                        {vehicle.plate} - {vehicle.type} ({vehicle.capacity}kg)
                      </option>
                    ))}
                  </select>
                  {errors.vehicleId && <p className="text-[#EF4444] text-xs mt-1">{errors.vehicleId}</p>}
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                    <User size={16} />
                    Select Driver *
                  </label>
                  <select
                    value={formData.driverId}
                    onChange={(e) => handleChange("driverId", e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white focus:outline-none transition-all ${
                      errors.driverId
                        ? "border-[#EF4444] focus:border-[#EF4444]"
                        : "border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    }`}
                  >
                    <option value="" className="bg-[#0F172A]">Choose a driver...</option>
                    {availableDrivers.map((driver) => (
                      <option key={driver.id} value={driver.id} className="bg-[#0F172A]">
                        {driver.name} (★ {driver.rating})
                      </option>
                    ))}
                  </select>
                  {errors.driverId && <p className="text-[#EF4444] text-xs mt-1">{errors.driverId}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">Trip Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-gray-400 text-xs mb-1">Priority</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
                    formData.priority === "high"
                      ? "bg-[#EF4444]/20 text-[#EF4444]"
                      : formData.priority === "medium"
                      ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                      : "bg-[#10B981]/20 text-[#10B981]"
                  }`}>
                    {formData.priority.toUpperCase()}
                  </span>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-gray-400 text-xs mb-1">Cargo Weight</p>
                  <p className="text-white font-bold">{formData.weight || "—"} kg</p>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-gray-400 text-xs mb-1">Route</p>
                  <p className="text-white text-sm">{formData.origin || "Origin"}</p>
                  <p className="text-gray-500 text-xs my-1">↓</p>
                  <p className="text-white text-sm">{formData.destination || "Destination"}</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-3 rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Create Trip
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
