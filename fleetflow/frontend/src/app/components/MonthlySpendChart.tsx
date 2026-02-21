import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomChartTooltip } from "./CustomChartTooltip";
import { useState } from "react";

interface SpendData {
  month: string;
  fuel: number;
  maintenance: number;
  payroll: number;
  total: number;
}

interface MonthlySpendChartProps {
  data: SpendData[];
}

export function MonthlySpendChart({ data }: MonthlySpendChartProps) {
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
    <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
      {[
        { key: "fuel", label: "Fuel", color: "#3B82F6" },
        { key: "maintenance", label: "Maintenance", color: "#F59E0B" },
        { key: "payroll", label: "Payroll", color: "#10B981" },
        { key: "total", label: "Total Cost", color: "#EF4444" },
      ].map((item) => (
        <button
          key={item.key}
          onClick={() => toggleSeries(item.key)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
            hiddenSeries.has(item.key)
              ? "bg-white/5 opacity-50"
              : "bg-white/10 border border-white/20"
          }`}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-white font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="mb-6">
        <h2 className="text-white text-2xl font-bold mb-1">Monthly Spend Breakdown</h2>
        <p className="text-gray-400 text-sm">Operational costs by category</p>
      </div>

      <CustomLegend />

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          {!hiddenSeries.has("fuel") && (
            <Bar
              dataKey="fuel"
              stackId="costs"
              fill="#3B82F6"
              radius={[0, 0, 0, 0]}
            />
          )}
          {!hiddenSeries.has("maintenance") && (
            <Bar
              dataKey="maintenance"
              stackId="costs"
              fill="#F59E0B"
              radius={[0, 0, 0, 0]}
            />
          )}
          {!hiddenSeries.has("payroll") && (
            <Bar
              dataKey="payroll"
              stackId="costs"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          )}
          {!hiddenSeries.has("total") && (
            <Line
              type="monotone"
              dataKey="total"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: "#EF4444", r: 5 }}
              activeDot={{ r: 7 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
