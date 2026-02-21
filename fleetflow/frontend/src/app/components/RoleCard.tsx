import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
}

export function RoleCard({ title, description, icon: Icon, isSelected, onClick }: RoleCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative w-full p-6 rounded-xl text-left transition-all duration-300
        ${
          isSelected
            ? "bg-gradient-to-br from-[#3B82F6]/20 to-[#2563EB]/20 border-2 border-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20"
        }
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Icon */}
      <div
        className={`
          inline-flex p-3 rounded-lg mb-4
          ${isSelected ? "bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "bg-white/10"}
        `}
      >
        <Icon size={28} className="text-white" />
      </div>

      {/* Content */}
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.button>
  );
}
