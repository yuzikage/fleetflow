import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  valueColor?: string;
  delay?: number;
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  valueColor = "text-white",
  delay = 0,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white/10 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <Icon size={24} className="text-[#3B82F6]" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              trend.isPositive
                ? "bg-[#10B981]/20 text-[#10B981]"
                : "bg-[#EF4444]/20 text-[#EF4444]"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
        <h2 className={`text-4xl font-bold mb-1 ${valueColor}`}>
          {value}
        </h2>
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
