import { FileText, FileSpreadsheet, Printer } from "lucide-react";
import { motion } from "motion/react";

interface ExportToolbarProps {
  onExportPDF: () => void;
  onExportCSV: () => void;
  onPrint: () => void;
}

export function ExportToolbar({ onExportPDF, onExportCSV, onPrint }: ExportToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex gap-2"
    >
      <button
        onClick={onExportPDF}
        className="flex items-center gap-2 px-4 py-3 bg-[#EF4444]/20 text-[#EF4444] rounded-xl font-medium hover:bg-[#EF4444]/30 transition-all border border-[#EF4444]/40 hover:scale-105"
        title="Export as PDF"
      >
        <FileText size={20} />
        <span className="hidden md:inline">PDF</span>
      </button>

      <button
        onClick={onExportCSV}
        className="flex items-center gap-2 px-4 py-3 bg-[#10B981]/20 text-[#10B981] rounded-xl font-medium hover:bg-[#10B981]/30 transition-all border border-[#10B981]/40 hover:scale-105"
        title="Export as CSV"
      >
        <FileSpreadsheet size={20} />
        <span className="hidden md:inline">CSV</span>
      </button>

      <button
        onClick={onPrint}
        className="flex items-center gap-2 px-4 py-3 bg-[#3B82F6]/20 text-[#3B82F6] rounded-xl font-medium hover:bg-[#3B82F6]/30 transition-all border border-[#3B82F6]/40 hover:scale-105"
        title="Print Report"
      >
        <Printer size={20} />
        <span className="hidden md:inline">Print</span>
      </button>
    </motion.div>
  );
}
