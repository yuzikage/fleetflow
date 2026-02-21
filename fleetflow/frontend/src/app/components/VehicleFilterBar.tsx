import { Search, Filter } from "lucide-react";

interface VehicleFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  vehicleType: string;
  onVehicleTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export function VehicleFilterBar({
  searchQuery,
  onSearchChange,
  vehicleType,
  onVehicleTypeChange,
  status,
  onStatusChange,
}: VehicleFilterBarProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by license plate or model..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
          />
        </div>

        {/* Vehicle Type Filter */}
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={vehicleType}
            onChange={(e) => onVehicleTypeChange(e.target.value)}
            className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all min-w-[140px]"
          >
            <option value="all" className="bg-[#1E293B]">All Types</option>
            <option value="truck" className="bg-[#1E293B]">Trucks</option>
            <option value="van" className="bg-[#1E293B]">Vans</option>
            <option value="bike" className="bg-[#1E293B]">Motorcycles</option>
          </select>
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all min-w-[140px]"
        >
          <option value="all" className="bg-[#1E293B]">All Status</option>
          <option value="active" className="bg-[#1E293B]">Active</option>
          <option value="maintenance" className="bg-[#1E293B]">Maintenance</option>
          <option value="idle" className="bg-[#1E293B]">Idle</option>
        </select>
      </div>
    </div>
  );
}
