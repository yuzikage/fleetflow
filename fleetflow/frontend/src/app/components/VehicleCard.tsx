import { Truck, Bus, Bike } from "lucide-react";

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  licensePlate: string;
  capacity: number;
  odometer: number;
  status: "active" | "maintenance" | "idle";
  type: "truck" | "van" | "bike";
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

export function VehicleCard({ vehicle, onEdit, onDelete }: VehicleCardProps) {
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
        return <Truck size={24} className="text-[#3B82F6]" />;
      case "van":
        return <Bus size={24} className="text-[#10B981]" />;
      case "bike":
        return <Bike size={24} className="text-[#F59E0B]" />;
      default:
        return <Truck size={24} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">{getVehicleIcon(vehicle.type)}</div>
          <div>
            <h3 className="text-white font-semibold">{vehicle.brand} {vehicle.model}</h3>
            <p className="text-gray-400 text-sm">{vehicle.licensePlate}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehicle.status)} capitalize`}>
          {vehicle.status}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-xs mb-1">Capacity</p>
          <p className="text-white font-medium">{vehicle.capacity.toLocaleString()} kg</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Odometer</p>
          <p className="text-white font-medium">{vehicle.odometer.toLocaleString()} km</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
        <button
          onClick={() => onEdit(vehicle)}
          className="flex-1 px-4 py-2 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg text-sm font-medium hover:bg-[#3B82F6]/30 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(vehicle.id)}
          className="flex-1 px-4 py-2 bg-[#EF4444]/20 text-[#EF4444] rounded-lg text-sm font-medium hover:bg-[#EF4444]/30 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
