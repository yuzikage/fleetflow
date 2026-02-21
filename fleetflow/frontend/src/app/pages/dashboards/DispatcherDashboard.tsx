import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFleetData } from "../../context/FleetDataContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MapPin, Clock, Package, TrendingUp, Plus, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { dashboardService } from "../../../services/dashboardService";
import { toast } from "sonner";

export function DispatcherDashboard() {
  const navigate = useNavigate();
  const { recentTripUpdates } = useFleetData();
  
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getDispatcherDashboard();
      
      if (response.success) {
        setDashboardData(response.data);
      } else {
        setError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      }
    } catch (err: any) {
      console.error('Dashboard error:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="text-[#EF4444] mx-auto mb-4" size={48} />
          <p className="text-white text-xl mb-2">Failed to Load Dashboard</p>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-[#3B82F6] text-white px-6 py-2 rounded-lg hover:bg-[#2563EB] transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { kpis, cargoQueue, activeTrips, tripStats } = dashboardData || {
    kpis: { activeTrips: 0, pendingCargo: 0, availableVehicles: 0, availableDrivers: 0 },
    cargoQueue: [],
    activeTrips: [],
    tripStats: []
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40";
      case "medium":
        return "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40";
      default:
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dispatcher Dashboard</h1>
            <p className="text-gray-400">Active deliveries and cargo queue management</p>
          </div>
          <button
            onClick={() => navigate("/trips/create")}
            className="flex items-center gap-2 bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2563EB] transition-all hover:scale-105"
          >
            <Plus size={20} />
            Create Trip
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Package className="text-[#3B82F6]" size={24} />
            <span className="text-[#EF4444] text-sm font-semibold">
              {cargoQueue.filter((c: any) => c.priority === 'high').length} Urgent
            </span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Pending Cargo</h3>
          <p className="text-3xl font-bold text-white">{kpis.pendingCargo}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <MapPin className="text-[#10B981]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">Live</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Active Trips</h3>
          <p className="text-3xl font-bold text-white">{kpis.activeTrips}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-[#F59E0B]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Available</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Available Vehicles</h3>
          <p className="text-3xl font-bold text-white">{kpis.availableVehicles}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-[#06B6D4]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Ready</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Available Drivers</h3>
          <p className="text-3xl font-bold text-white">{kpis.availableDrivers}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pending Cargo Queue */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Pending Cargo Queue</h2>
            <span className="text-gray-400 text-sm">{cargoQueue.length} items</span>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {cargoQueue.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Package size={48} className="mx-auto mb-2 opacity-50" />
                <p>No pending cargo</p>
              </div>
            ) : (
              cargoQueue.map((cargo: any, index: number) => (
              <motion.div
                key={cargo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => navigate("/trips/create", { state: { cargo } })}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold font-mono mb-1">{cargo.id}</p>
                    <p className="text-gray-400 text-sm">{cargo.weight} kg</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(cargo.priority)}`}>
                    {cargo.priority.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1 mb-2">
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-[#10B981]">●</span> {cargo.origin}
                  </p>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-[#EF4444]">●</span> {cargo.destination}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#3B82F6] text-sm">
                  <Clock size={14} />
                  <span>ETA: {cargo.eta}</span>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Weekly Trip Stats */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Weekly Trip Performance</h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tripStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="completed" fill="#10B981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-gray-400 text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="text-gray-400 text-sm">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Trip Progress Bars */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Active Trip Progress</h2>
          <button
            onClick={() => navigate("/trips")}
            className="text-[#3B82F6] text-sm font-medium hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {activeTrips.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <MapPin size={48} className="mx-auto mb-2 opacity-50" />
              <p>No active trips</p>
            </div>
          ) : (
            activeTrips.map((trip: any, index: number) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-semibold font-mono">{trip.id}</p>
                  <p className="text-gray-400 text-sm">{trip.vehicle} • {trip.driver}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{trip.progress}%</p>
                  <p className="text-gray-400 text-xs">ETA: {trip.eta}</p>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trip.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    trip.progress > 75
                      ? "bg-[#10B981]"
                      : trip.progress > 50
                      ? "bg-[#3B82F6]"
                      : "bg-[#F59E0B]"
                  }`}
                />
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
