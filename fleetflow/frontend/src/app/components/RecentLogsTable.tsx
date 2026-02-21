import { CheckCircle, TrendingUp } from "lucide-react";

interface ExpenseLog {
  id: string;
  tripId: string;
  vehiclePlate: string;
  fuelCost: number;
  totalCost: number;
  efficiency: number;
  loggedAt: string;
}

interface RecentLogsTableProps {
  logs: ExpenseLog[];
}

export function RecentLogsTable({ logs }: RecentLogsTableProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-semibold mb-1">Recent Logs</h2>
            <p className="text-gray-400 text-sm">Last {logs.length} expense entries</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#10B981]/20 text-[#10B981] rounded-lg">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">All Logged</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Trip ID</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Vehicle</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Fuel Cost
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Total Cost
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Efficiency
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Logged At
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={log.id}
                className={`
                  border-b border-white/5 hover:bg-white/5 transition-colors
                  ${index % 2 === 0 ? "bg-white/[0.02]" : ""}
                `}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#10B981]/20 rounded-full">
                    <CheckCircle size={16} className="text-[#10B981]" />
                  </div>
                </td>
                <td className="px-6 py-4 text-white text-sm font-mono">{log.tripId}</td>
                <td className="px-6 py-4 text-white text-sm font-mono">{log.vehiclePlate}</td>
                <td className="px-6 py-4 text-white text-sm font-medium">
                  ${log.fuelCost.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-[#3B82F6] text-sm font-bold">
                  ${log.totalCost.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">{log.efficiency} km/L</span>
                    {log.efficiency > 12 && (
                      <TrendingUp size={14} className="text-[#10B981]" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">{log.loggedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <div className="py-12 text-center">
            <CheckCircle size={48} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400">No expense logs yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
