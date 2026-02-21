import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ExpenseBreakdownChartProps {
  fuelCost: number;
  tollCost: number;
  miscCost: number;
}

export function ExpenseBreakdownChart({
  fuelCost,
  tollCost,
  miscCost,
}: ExpenseBreakdownChartProps) {
  const total = fuelCost + tollCost + miscCost;

  if (total === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <h3 className="text-white font-semibold mb-4">Expense Breakdown</h3>
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
          Enter expenses to see breakdown
        </div>
      </div>
    );
  }

  const data = [
    { name: "Fuel", value: fuelCost, color: "#3B82F6" },
    { name: "Tolls", value: tollCost, color: "#10B981" },
    { name: "Misc", value: miscCost, color: "#F59E0B" },
  ].filter((item) => item.value > 0);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <h3 className="text-white font-semibold mb-4">Expense Breakdown</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-400 text-xs">{item.name}</span>
            </div>
            <p className="text-white font-semibold">${item.value.toFixed(2)}</p>
            <p className="text-gray-500 text-xs">
              {((item.value / total) * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 font-medium">Total Cost</span>
          <span className="text-white text-xl font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
