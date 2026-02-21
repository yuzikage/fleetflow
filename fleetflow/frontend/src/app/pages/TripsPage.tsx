import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { MapPin, Truck, User, Package, Plus, Clock, Filter } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useFleetData } from "../context/FleetDataContext";

export function TripsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTripUpdate } = useFleetData();
  const preselectedVehicle = location.state?.selectedVehicle;
  const newTrip = location.state?.newTrip;

  const [selectedVehicle, setSelectedVehicle] = useState(preselectedVehicle || "");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [activeTrips, setActiveTrips] = useState([
    { id: "TRP-001", vehicle: "VAN-2891", driver: "John Doe", status: "In Transit", progress: 75, origin: "Warehouse A", destination: "Client Site 1", eta: "45 min" },
    { id: "TRP-002", vehicle: "TRK-1456", driver: "Jane Smith", status: "Loading", progress: 20, origin: "Warehouse B", destination: "Client Site 2", eta: "3 hrs" },
    { id: "TRP-003", vehicle: "VAN-3421", driver: "Bob Wilson", status: "Scheduled", progress: 0, origin: "Warehouse C", destination: "Client Site 3", eta: "Tomorrow" },
    ...(newTrip ? [{ ...newTrip, progress: 0, eta: "Pending" }] : []),
  ]);

  const vehicles = [
    { id: "VEH-001", plate: "BIKE-1122", capacity: 50, inMaintenance: false, suspended: false },
    { id: "VEH-002", plate: "VAN-2891", capacity: 1500, inMaintenance: false, suspended: false },
    { id: "VEH-003", plate: "TRK-1456", capacity: 5000, inMaintenance: false, suspended: false },
    { id: "VEH-004", plate: "VAN-3421", capacity: 1500, inMaintenance: true, suspended: false },
  ];

  const drivers = [
    { id: "DRV-001", name: "John Doe", suspended: false },
    { id: "DRV-002", name: "Jane Smith", suspended: false },
    { id: "DRV-003", name: "Bob Wilson", suspended: true },
  ];

  const availableVehicles = vehicles.filter((v) => !v.inMaintenance);
  const availableDrivers = drivers.filter((d) => !d.suspended);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVehicle || !selectedDriver || !cargoWeight || !origin || !destination) {
      toast.error("Please fill in all fields");
      return;
    }

    const vehicle = vehicles.find((v) => v.id === selectedVehicle);
    const weight = parseFloat(cargoWeight);

    if (vehicle && weight > vehicle.capacity) {
      toast.error(`Overload! Vehicle capacity is ${vehicle.capacity}kg`);
      return;
    }

    const driver = drivers.find((d) => d.id === selectedDriver);
    const tripId = `TRP-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;

    const newTrip = {
      id: tripId,
      vehicle: vehicle?.plate || "",
      driver: driver?.name || "",
      status: "Scheduled",
      progress: 0,
      origin,
      destination,
      eta: "Calculating...",
    };

    setActiveTrips([...activeTrips, newTrip]);
    addTripUpdate({ id: tripId, status: "Scheduled" });

    toast.success("Trip dispatched successfully!");
    
    // Reset form
    setSelectedVehicle("");
    setSelectedDriver("");
    setCargoWeight("");
    setOrigin("");
    setDestination("");
  };

  const handleUpdateStatus = (tripId: string, newStatus: string) => {
    setActiveTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId ? { ...trip, status: newStatus, progress: newStatus === "Completed" ? 100 : trip.progress } : trip
      )
    );

    addTripUpdate({ id: tripId, status: newStatus });
    toast.success(`Trip ${tripId} status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40";
      case "In Transit":
        return "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/40";
      case "Loading":
        return "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40";
      default:
        return "bg-white/10 text-gray-400 border-white/20";
    }
  };

  const filteredTrips = filterStatus === "all" 
    ? activeTrips 
    : activeTrips.filter((trip) => trip.status.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Trip Dispatcher</h1>
          <p className="text-gray-400">Create and manage delivery trips ({activeTrips.length} active)</p>
        </div>
        <button
          onClick={() => navigate("/trips/create")}
          className="flex items-center gap-2 bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2563EB] transition-all hover:scale-105"
        >
          <Plus size={20} />
          Create Trip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Dispatch Form */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] h-fit">
          <h2 className="text-xl font-bold text-white mb-6">Quick Dispatch</h2>

          <form onSubmit={handleDispatch} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <Truck size={16} />
                Vehicle
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
              >
                <option value="">Choose...</option>
                {availableVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id} className="bg-[#0F172A]">
                    {vehicle.plate} ({vehicle.capacity}kg)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <User size={16} />
                Driver
              </label>
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
              >
                <option value="">Choose...</option>
                {availableDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id} className="bg-[#0F172A]">
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <Package size={16} />
                Weight (kg)
              </label>
              <input
                type="number"
                value={cargoWeight}
                onChange={(e) => setCargoWeight(e.target.value)}
                placeholder="Cargo weight"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <MapPin size={16} />
                Route
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="From"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all mb-2"
              />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="To"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white py-3.5 rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02]"
            >
              Dispatch Trip
            </button>
          </form>
        </div>

        {/* Active Trips List */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Active Trips</h2>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="all" className="bg-[#0F172A]">All Status</option>
                <option value="scheduled" className="bg-[#0F172A]">Scheduled</option>
                <option value="loading" className="bg-[#0F172A]">Loading</option>
                <option value="in transit" className="bg-[#0F172A]">In Transit</option>
                <option value="completed" className="bg-[#0F172A]">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold font-mono mb-1">{trip.id}</p>
                    <p className="text-gray-400 text-sm">{trip.vehicle} • {trip.driver}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-[#10B981]">●</span> {trip.origin}
                  </p>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-[#EF4444]">●</span> {trip.destination}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">ETA: {trip.eta}</span>
                </div>

                {trip.status !== "Completed" && (
                  <div className="flex gap-2">
                    {trip.status === "Scheduled" && (
                      <button
                        onClick={() => handleUpdateStatus(trip.id, "Loading")}
                        className="flex-1 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 py-2 rounded-lg text-sm font-semibold hover:bg-[#F59E0B]/30 transition-all"
                      >
                        Start Loading
                      </button>
                    )}
                    {trip.status === "Loading" && (
                      <button
                        onClick={() => handleUpdateStatus(trip.id, "In Transit")}
                        className="flex-1 bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40 py-2 rounded-lg text-sm font-semibold hover:bg-[#3B82F6]/30 transition-all"
                      >
                        Depart
                      </button>
                    )}
                    {trip.status === "In Transit" && (
                      <button
                        onClick={() => handleUpdateStatus(trip.id, "Completed")}
                        className="flex-1 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 py-2 rounded-lg text-sm font-semibold hover:bg-[#10B981]/30 transition-all"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}