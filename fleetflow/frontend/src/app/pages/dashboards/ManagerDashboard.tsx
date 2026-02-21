import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Wrench, Gauge, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { dashboardService, DashboardData } from "../../../services/dashboardService";
import { toast } from "sonner";

export function ManagerDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardService.getManagerDashboard();
        setDashboardData(data);
      } catch (error: any) {
        console.error('Dashboard error:', error);
        toast.error(error.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  const { kpis, utilizationData, healthTrendData, maintenanceHeatmap } = dashboardData;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Fleet Manager Dashboard</h1>
        <p className="text-gray-400">Maintenance analytics and asset utilization overview</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Gauge className="text-[#3B82F6]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">+12%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Utilization Rate</h3>
          <p className="text-3xl font-bold text-white">{kpis.utilizationRate}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Wrench className="text-[#F59E0B]" size={24} />
            <span className="text-[#EF4444] text-sm font-semibold">{kpis.urgentMaintenance} Urgent</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Maintenance Queue</h3>
          <p className="text-3xl font-bold text-white">{kpis.maintenanceQueue}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-[#10B981]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">+3%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Avg Fleet Health</h3>
          <p className="text-3xl font-bold text-white">{kpis.avgFleetHealth}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-[#EF4444]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Last 30d</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Critical Alerts</h3>
          <p className="text-3xl font-bold text-white">{kpis.criticalAlerts}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Asset Utilization Gauge */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Asset Utilization</h2>
          
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={utilizationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {utilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 mt-4">
            {utilizationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-400 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Health Trend */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Fleet Health Trend</h2>
          
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={healthTrendData}>
              <defs>
                <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[70, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="health"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#healthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maintenance Heatmap */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Maintenance Heatmap by Vehicle Type</h2>
          <button
            onClick={() => navigate("/maintenance")}
            className="text-[#3B82F6] text-sm font-medium hover:underline"
          >
            View Details
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-semibold">Vehicle Type</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Scheduled</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Urgent</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Completed (30d)</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Health Score</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHeatmap.map((row) => (
                <tr key={row.type} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="p-4 text-white font-semibold">{row.type}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-[#3B82F6]/20 text-[#3B82F6] rounded-lg text-sm font-semibold">
                      {row.scheduled}
                    </span>
                  </td>
                  <td className="p-4">
                    {row.urgent > 0 ? (
                      <span className="px-3 py-1 bg-[#EF4444]/20 text-[#EF4444] rounded-lg text-sm font-semibold">
                        {row.urgent}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-400">{row.completed}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.health > 90
                              ? "bg-[#10B981]"
                              : row.health > 80
                              ? "bg-[#F59E0B]"
                              : "bg-[#EF4444]"
                          }`}
                          style={{ width: `${row.health}%` }}
                        />
                      </div>
                      <span
                        className={`font-bold text-sm ${
                          row.health > 90
                            ? "text-[#10B981]"
                            : row.health > 80
                            ? "text-[#F59E0B]"
                            : "text-[#EF4444]"
                        }`}
                      >
                        {row.health}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
