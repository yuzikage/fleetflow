import { Plus } from "lucide-react";

interface VehicleHeaderProps {
  onAddClick: () => void;
}

export function VehicleHeader({ onAddClick }: VehicleHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Vehicle Registry</h1>
        <p className="text-gray-400">Manage your fleet assets and monitor vehicle status</p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
      >
        <Plus size={20} />
        <span>Add New Vehicle</span>
      </button>
    </div>
  );
}
