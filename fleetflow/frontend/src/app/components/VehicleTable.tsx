import { MoreVertical, Edit2, Trash2, Archive, Truck, Bus, Bike } from "lucide-react";
import { useState } from "react";
import { Vehicle } from "./VehicleCard";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

export function VehicleTable({ vehicles, onEdit, onDelete }: VehicleTableProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30";
      case "maintenance":
        return "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30";
      case "idle":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-white/10 text-gray-400 border-white/20";
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "truck":
        return <Truck size={20} className="text-[#3B82F6]" />;
      case "van":
        return <Bus size={20} className="text-[#10B981]" />;
      case "bike":
        return <Bike size={20} className="text-[#F59E0B]" />;
      default:
        return <Truck size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Vehicle</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">License Plate</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Capacity</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Odometer</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Status</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">{getVehicleIcon(vehicle.type)}</div>
                    <div>
                      <p className="text-white font-medium">{vehicle.brand} {vehicle.model}</p>
                      <p className="text-gray-400 text-xs capitalize">{vehicle.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-300 font-mono">{vehicle.licensePlate}</td>
                <td className="px-6 py-4 text-white">{vehicle.capacity.toLocaleString()} kg</td>
                <td className="px-6 py-4 text-gray-300">{vehicle.odometer.toLocaleString()} km</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehicle.status)} capitalize`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === vehicle.id ? null : vehicle.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                    
                    {activeMenu === vehicle.id && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-[#1E293B]/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl z-10 overflow-hidden">
                        <button
                          onClick={() => {
                            onEdit(vehicle);
                            setActiveMenu(null);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:bg-white/10 transition-colors text-sm"
                        >
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            onDelete(vehicle.id);
                            setActiveMenu(null);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors text-sm"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={() => setActiveMenu(null)}
                          className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:bg-white/10 transition-colors text-sm"
                        >
                          <Archive size={16} />
                          <span>Retire</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
