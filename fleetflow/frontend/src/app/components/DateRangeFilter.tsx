import { useState } from "react";
import { Calendar, Filter } from "lucide-react";

interface DateRangeFilterProps {
  onApply: (startDate: string, endDate: string, vehicleType: string) => void;
}

export function DateRangeFilter({ onApply }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState("2025-09-01");
  const [endDate, setEndDate] = useState("2026-02-21");
  const [vehicleType, setVehicleType] = useState("all");

  const handleApply = () => {
    onApply(startDate, endDate, vehicleType);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mb-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
            <Calendar size={14} />
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
            <Calendar size={14} />
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
            <Filter size={14} />
            Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          >
            <option value="all" className="bg-[#0F172A]">All Vehicles</option>
            <option value="motorcycle" className="bg-[#0F172A]">Motorcycles</option>
            <option value="van" className="bg-[#0F172A]">Vans</option>
            <option value="truck" className="bg-[#0F172A]">Trucks</option>
            <option value="trailer" className="bg-[#0F172A]">Trailers</option>
          </select>
        </div>

        <button
          onClick={handleApply}
          className="bg-[#3B82F6] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#2563EB] transition-all flex items-center gap-2"
        >
          <Filter size={16} />
          Apply Filters
        </button>
      </div>
    </div>
  );
}
