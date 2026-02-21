import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PerformanceChartProps {
  data: Array<{
    month: string;
    completionRate: number;
    safetyScore: number;
  }>;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <h2 className="text-white text-xl font-semibold mb-6">Performance Trends</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: "12px" }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "14px", color: "#9CA3AF" }}
          />
          <Line
            type="monotone"
            dataKey="completionRate"
            stroke="#06B6D4"
            strokeWidth={3}
            dot={{ fill: "#06B6D4", r: 5 }}
            activeDot={{ r: 7 }}
            name="Completion Rate %"
          />
          <Line
            type="monotone"
            dataKey="safetyScore"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: "#10B981", r: 5 }}
            activeDot={{ r: 7 }}
            name="Safety Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
