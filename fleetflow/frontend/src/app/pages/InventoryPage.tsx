import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Truck, Plus, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { AddVehicleModal } from "../components/AddVehicleModal";
import { vehicleService, Vehicle } from "../../services/vehicleService";

export function InventoryPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getAllVehicles();
      setVehicles(data);
    } catch (error: any) {
      console.error('Fetch vehicles error:', error);
      toast.error(error.response?.data?.message || 'Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssignToTrip = (vehicleId: string, plate: string) => {
    toast.success(`Assigning ${plate} to trip...`);
    navigate("/trips", { state: { selectedVehicle: vehicleId } });
  };

  const handleAddVehicle = async (newVehicle: any) => {
    try {
      await vehicleService.createVehicle(newVehicle);
      toast.success('Vehicle added successfully!');
      fetchVehicles(); // Refresh the list
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add vehicle');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Vehicle Registry</h1>
          <p className="text-gray-400">Manage your fleet inventory ({vehicles.length} vehicles)</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2563EB] transition-all hover:scale-105"
        >
          <Plus size={20} />
          Add Vehicle
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by plate, ID, make, or model..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {/* Vehicle Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Truck size={32} className="text-gray-600" />
            </div>
            <p className="text-gray-400 font-medium mb-1">No vehicles found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search query</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 font-semibold">Vehicle ID</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Plate</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Type</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Make/Model</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Capacity (kg)</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                  <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="p-4 text-white font-mono">{vehicle.name}</td>
                    <td className="p-4 text-white font-semibold">{vehicle.licensePlate}</td>
                    <td className="p-4 text-gray-400">{vehicle.type}</td>
                    <td className="p-4 text-gray-400">{vehicle.type}</td>
                    <td className="p-4 text-gray-400">{vehicle.maxCapacity}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          vehicle.status === "Available"
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : vehicle.status === "On Trip"
                            ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                            : vehicle.status === "In Shop"
                            ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                            : "bg-[#EF4444]/20 text-[#EF4444]"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleAssignToTrip(vehicle._id, vehicle.licensePlate)}
                        disabled={vehicle.status !== "Available"}
                        className="text-[#3B82F6] hover:underline disabled:text-gray-600 disabled:cursor-not-allowed"
                      >
                        Assign to Trip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddVehicle}
      />
    </div>
  );
}