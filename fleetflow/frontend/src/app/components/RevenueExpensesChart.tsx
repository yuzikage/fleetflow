import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CustomChartTooltip } from "./CustomChartTooltip";
import { useState } from "react";

interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
}

interface RevenueExpensesChartProps {
  data: ChartData[];
}

export function RevenueExpensesChart({ data }: RevenueExpensesChartProps) {
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const toggleSeries = (dataKey: string) => {
    const newHidden = new Set(hiddenSeries);
    if (newHidden.has(dataKey)) {
      newHidden.delete(dataKey);
    } else {
      newHidden.add(dataKey);
    }
    setHiddenSeries(newHidden);
  };

  const CustomLegend = () => (
    <div className="flex items-center justify-center gap-6 mb-4">
      <button
        onClick={() => toggleSeries("revenue")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
          hiddenSeries.has("revenue")
            ? "bg-white/5 opacity-50"
            : "bg-[#3B82F6]/20 border border-[#3B82F6]/40"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
        <span className="text-sm text-white font-medium">Revenue</span>
      </button>
      <button
        onClick={() => toggleSeries("expenses")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
          hiddenSeries.has("expenses")
            ? "bg-white/5 opacity-50"
            : "bg-[#EF4444]/20 border border-[#EF4444]/40"
        }`}
      >
        <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
        <span className="text-sm text-white font-medium">Expenses</span>
      </button>
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="mb-6">
        <h2 className="text-white text-2xl font-bold mb-1">Revenue vs. Expenses</h2>
        <p className="text-gray-400 text-sm">6-month financial performance overview</p>
      </div>

      <CustomLegend />

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomChartTooltip />} />
          {!hiddenSeries.has("revenue") && (
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          )}
          {!hiddenSeries.has("expenses") && (
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
