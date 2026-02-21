import { Truck, CheckCircle, AlertCircle } from "lucide-react";

interface StatsSidebarProps {
  totalAssets: number;
  activeNow: number;
  needsService: number;
}

export function StatsSidebar({ totalAssets, activeNow, needsService }: StatsSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Total Assets */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#3B82F6]/20 rounded-lg">
            <Truck size={24} className="text-[#3B82F6]" />
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-1">Total Assets</p>
        <p className="text-white text-3xl font-bold">{totalAssets}</p>
      </div>

      {/* Active Now */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#10B981]/20 rounded-lg">
            <CheckCircle size={24} className="text-[#10B981]" />
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-1">Active Now</p>
        <p className="text-white text-3xl font-bold">{activeNow}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#10B981] to-[#059669]"
              style={{ width: `${(activeNow / totalAssets) * 100}%` }}
            />
          </div>
          <span className="text-[#10B981] text-xs font-medium">
            {Math.round((activeNow / totalAssets) * 100)}%
          </span>
        </div>
      </div>

      {/* Needs Service */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#F59E0B]/20 rounded-lg">
            <AlertCircle size={24} className="text-[#F59E0B]" />
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-1">Needs Service</p>
        <p className="text-white text-3xl font-bold">{needsService}</p>
        {needsService > 0 && (
          <button className="mt-3 w-full px-3 py-2 bg-[#F59E0B]/20 text-[#F59E0B] rounded-lg text-sm font-medium hover:bg-[#F59E0B]/30 transition-colors">
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
