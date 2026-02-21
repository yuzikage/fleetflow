import { FileText, Download } from "lucide-react";

interface ServiceRecord {
  id: string;
  date: string;
  vehicleId: string;
  vehiclePlate: string;
  serviceType: string;
  finalCost: number;
  mechanic: string;
  certificate?: string;
}

interface ServiceHistoryTableProps {
  records: ServiceRecord[];
}

export function ServiceHistoryTable({ records }: ServiceHistoryTableProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-white text-xl font-semibold mb-1">Service History</h2>
        <p className="text-gray-400 text-sm">{records.length} completed services</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Date
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Vehicle ID
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Service Type
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Mechanic
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Final Cost
              </th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                Certificate
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id}
                className={`
                  border-b border-white/5 hover:bg-white/5 transition-colors
                  ${index % 2 === 0 ? "bg-white/[0.02]" : ""}
                `}
              >
                <td className="px-6 py-4 text-white text-sm">{record.date}</td>
                <td className="px-6 py-4 text-white text-sm font-mono">
                  {record.vehiclePlate}
                </td>
                <td className="px-6 py-4 text-white text-sm capitalize">
                  {record.serviceType.replace(/-/g, " ")}
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm">{record.mechanic}</td>
                <td className="px-6 py-4 text-white text-sm font-medium">
                  ${record.finalCost.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {record.certificate ? (
                    <a
                      href={record.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg text-sm font-medium hover:bg-[#3B82F6]/30 transition-colors"
                    >
                      <FileText size={14} />
                      <span>View</span>
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <div className="py-12 text-center">
            <FileText size={48} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400">No service history available</p>
          </div>
        )}
      </div>
    </div>
  );
}
