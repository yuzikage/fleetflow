import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ValidationToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export function ValidationToast({ show, message, onClose }: ValidationToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 z-50 max-w-md"
        >
          <div className="bg-[#EF4444]/20 backdrop-blur-xl border-2 border-[#EF4444] rounded-xl p-4 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#EF4444]/30 rounded-lg">
                <AlertTriangle size={20} className="text-[#EF4444]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Validation Error</h3>
                <p className="text-gray-300 text-sm">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
