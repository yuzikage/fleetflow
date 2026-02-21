interface CustomChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function CustomChartTooltip({ active, payload, label }: CustomChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-[#0F172A]/95 backdrop-blur-xl border-2 border-white/20 rounded-xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <p className="text-white font-semibold mb-3">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-400 text-sm capitalize">
              {entry.name}
            </span>
          </div>
          <span className="text-white font-bold">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
