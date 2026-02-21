import { useState } from "react";
import { DollarSign, Fuel, Clock } from "lucide-react";
import { toast } from "sonner";
import { useFleetData } from "../context/FleetDataContext";

export function ExpensesPage() {
  const { addTripUpdate } = useFleetData();
  
  const [expenses, setExpenses] = useState([
    { id: "EXP-001", tripId: "TRP-001", vehicle: "VAN-2891", type: "Fuel", amount: 85, date: "2026-02-20", liters: 45 },
    { id: "EXP-002", tripId: "TRP-002", vehicle: "TRK-1456", type: "Fuel", amount: 120, date: "2026-02-19", liters: 62 },
  ]);

  const [newExpense, setNewExpense] = useState({
    tripId: "",
    vehicle: "",
    fuelLiters: "",
    fuelCost: "",
  });

  const handleLogExpense = () => {
    if (!newExpense.tripId || !newExpense.vehicle || !newExpense.fuelLiters || !newExpense.fuelCost) {
      toast.error("Please fill all fields");
      return;
    }

    const expenseId = `EXP-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`;
    const expenseRecord = {
      id: expenseId,
      tripId: newExpense.tripId,
      vehicle: newExpense.vehicle,
      type: "Fuel",
      amount: parseFloat(newExpense.fuelCost),
      date: new Date().toISOString().split("T")[0],
      liters: parseFloat(newExpense.fuelLiters),
    };

    setExpenses([expenseRecord, ...expenses]);

    // Simulate trip completion with revenue
    const mockRevenue = Math.floor(Math.random() * 300) + 200; // $200-$500
    
    addTripUpdate({
      id: newExpense.tripId,
      status: "Completed",
      revenue: mockRevenue,
      completedBy: "Dispatcher",
    });

    toast.success("Expense logged & trip completed!", {
      description: `${newExpense.tripId} completed with $${mockRevenue} revenue`,
    });

    setNewExpense({
      tripId: "",
      vehicle: "",
      fuelLiters: "",
      fuelCost: "",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Fuel & Expense Tracker</h1>
        <p className="text-gray-400">Log expenses and monitor spending</p>
      </div>

      {/* Log Expense Form */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <h2 className="text-xl font-bold text-white mb-4">Log New Expense</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Trip ID (e.g., TRP-001)"
            value={newExpense.tripId}
            onChange={(e) => setNewExpense({ ...newExpense, tripId: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
          <input
            type="text"
            placeholder="Vehicle (e.g., VAN-2891)"
            value={newExpense.vehicle}
            onChange={(e) => setNewExpense({ ...newExpense, vehicle: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
          <input
            type="number"
            placeholder="Fuel Liters"
            value={newExpense.fuelLiters}
            onChange={(e) => setNewExpense({ ...newExpense, fuelLiters: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
          <input
            type="number"
            placeholder="Fuel Cost ($)"
            value={newExpense.fuelCost}
            onChange={(e) => setNewExpense({ ...newExpense, fuelCost: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
          />
        </div>
        <button
          onClick={handleLogExpense}
          className="mt-4 bg-[#10B981] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#059669] transition-all flex items-center gap-2"
        >
          <DollarSign size={20} />
          Log Expense & Complete Trip
        </button>
        <p className="text-gray-500 text-xs mt-2">
          💡 This will trigger a real-time notification to Financial Analysts
        </p>
      </div>

      {/* Expenses List */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-semibold">Expense ID</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Trip ID</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Vehicle</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Type</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Liters</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Amount</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="p-4 text-white font-mono">{expense.id}</td>
                  <td className="p-4 text-white font-mono">{expense.tripId}</td>
                  <td className="p-4 text-white font-semibold">{expense.vehicle}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] rounded-lg text-xs font-semibold flex items-center gap-1 w-fit">
                      <Fuel size={14} />
                      {expense.type}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{expense.liters}L</td>
                  <td className="p-4 text-white font-semibold">${expense.amount}</td>
                  <td className="p-4 text-gray-400 flex items-center gap-2">
                    <Clock size={14} />
                    {expense.date}
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