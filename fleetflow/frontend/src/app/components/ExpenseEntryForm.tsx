import { useState, useEffect } from "react";
import { DollarSign, Gauge, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "motion/react";

interface Trip {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  destination: string;
  startOdometer: number;
  averageFuelConsumption: number; // km/L
}

interface ExpenseEntryFormProps {
  trips: Trip[];
  onSubmit: (expense: any) => void;
}

export function ExpenseEntryForm({ trips, onSubmit }: ExpenseEntryFormProps) {
  const [selectedTrip, setSelectedTrip] = useState("");
  const [litersRefilled, setLitersRefilled] = useState("");
  const [fuelCost, setFuelCost] = useState("");
  const [finalOdometer, setFinalOdometer] = useState("");
  const [tollCost, setTollCost] = useState("");
  const [miscCost, setMiscCost] = useState("");

  const [showSummary, setShowSummary] = useState(false);

  const selectedTripData = trips.find((t) => t.id === selectedTrip);

  const calculateDistance = () => {
    if (!selectedTripData || !finalOdometer) return 0;
    return parseInt(finalOdometer) - selectedTripData.startOdometer;
  };

  const calculateEfficiency = () => {
    const distance = calculateDistance();
    const liters = parseFloat(litersRefilled);
    if (liters > 0 && distance > 0) {
      return (distance / liters).toFixed(2);
    }
    return "0";
  };

  const getFuelTrend = () => {
    const efficiency = parseFloat(calculateEfficiency());
    if (!selectedTripData || efficiency === 0) return "neutral";

    if (efficiency < selectedTripData.averageFuelConsumption * 0.9) {
      return "high"; // Using more fuel than average (bad)
    } else if (efficiency > selectedTripData.averageFuelConsumption * 1.1) {
      return "low"; // Using less fuel than average (good)
    }
    return "neutral";
  };

  const getTotalCost = () => {
    return (
      parseFloat(fuelCost || "0") +
      parseFloat(tollCost || "0") +
      parseFloat(miscCost || "0")
    );
  };

  const handleSubmit = () => {
    if (!selectedTrip || !litersRefilled || !fuelCost || !finalOdometer) {
      alert("Please fill in all required fields");
      return;
    }

    setShowSummary(true);
  };

  const confirmSubmit = () => {
    const expense = {
      tripId: selectedTrip,
      vehicleId: selectedTripData?.vehicleId,
      fuel: {
        liters: parseFloat(litersRefilled),
        cost: parseFloat(fuelCost),
      },
      additionalExpenses: [
        ...(tollCost ? [{ type: "Toll", amount: parseFloat(tollCost) }] : []),
        ...(miscCost ? [{ type: "Misc", amount: parseFloat(miscCost) }] : []),
      ],
      finalOdometer: parseInt(finalOdometer),
      efficiency: parseFloat(calculateEfficiency()),
      totalCost: getTotalCost(),
      loggedAt: new Date().toISOString(),
    };

    onSubmit(expense);

    // Reset form
    setSelectedTrip("");
    setLitersRefilled("");
    setFuelCost("");
    setFinalOdometer("");
    setTollCost("");
    setMiscCost("");
    setShowSummary(false);
  };

  const fuelTrend = getFuelTrend();

  return (
    <>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#3B82F6]/20 rounded-lg">
            <DollarSign size={24} className="text-[#3B82F6]" />
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold">Log Trip Expenses</h2>
            <p className="text-gray-400 text-sm">Enter fuel and operational costs</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Trip Selector */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Select Completed Trip <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
            >
              <option value="" className="bg-[#1E293B]">
                Choose a trip
              </option>
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id} className="bg-[#1E293B]">
                  {trip.id} - {trip.vehiclePlate} to {trip.destination}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Liters Refilled <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={litersRefilled}
                  onChange={(e) => setLitersRefilled(e.target.value)}
                  placeholder="0.0"
                  className="w-full px-4 py-4 pr-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-gray-400 text-sm">L</span>
                  {fuelTrend === "high" && (
                    <TrendingUp size={16} className="text-[#EF4444]" title="Higher than average" />
                  )}
                  {fuelTrend === "low" && (
                    <TrendingDown size={16} className="text-[#10B981]" title="Lower than average" />
                  )}
                  {fuelTrend === "neutral" && litersRefilled && (
                    <Minus size={16} className="text-gray-400" title="Normal consumption" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Total Fuel Cost <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={fuelCost}
                  onChange={(e) => setFuelCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-4 pl-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Odometer Update */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Final Odometer Reading <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={finalOdometer}
                onChange={(e) => setFinalOdometer(e.target.value)}
                placeholder="Enter final reading"
                className="w-full px-4 py-4 pr-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                km
              </span>
            </div>
            {selectedTripData && finalOdometer && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Gauge size={14} className="text-[#3B82F6]" />
                <span className="text-gray-400">
                  Distance: <span className="text-white font-medium">{calculateDistance()} km</span>
                </span>
                <span className="text-gray-400 ml-4">
                  Efficiency:{" "}
                  <span className="text-white font-medium">{calculateEfficiency()} km/L</span>
                </span>
              </div>
            )}
          </div>

          {/* Additional Expenses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Toll Fees</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={tollCost}
                  onChange={(e) => setTollCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 pl-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Misc Expenses</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={miscCost}
                  onChange={(e) => setMiscCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 pl-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:border-2 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] text-lg"
          >
            Submit Expense Log
          </button>
        </div>
      </div>

      {/* Confirmation Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0F172A] border-2 border-white/10 rounded-xl p-6 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <h3 className="text-white text-xl font-bold mb-4">Confirm Expense Log</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Trip ID</span>
                <span className="text-white font-medium">{selectedTrip}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Vehicle</span>
                <span className="text-white font-medium">{selectedTripData?.vehiclePlate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Distance Traveled</span>
                <span className="text-white font-medium">{calculateDistance()} km</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fuel Efficiency</span>
                <span className="text-white font-medium">{calculateEfficiency()} km/L</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="text-gray-400 font-semibold">Total Cost</span>
                <span className="text-[#3B82F6] text-xl font-bold">${getTotalCost().toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSummary(false)}
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition-all border border-white/20"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
