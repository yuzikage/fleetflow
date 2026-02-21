import { KPICard } from "../components/KPICard";
import { RevenueExpensesChart } from "../components/RevenueExpensesChart";
import { EfficiencyLeaderboard } from "../components/EfficiencyLeaderboard";
import { MonthlySpendChart } from "../components/MonthlySpendChart";
import { ExportToolbar } from "../components/ExportToolbar";
import { DateRangeFilter } from "../components/DateRangeFilter";
import { DollarSign, TrendingUp, Gauge, Wrench } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    start: "2025-09-01",
    end: "2026-02-21",
    vehicleType: "all"
  });

  // Revenue vs Expenses Data
  const revenueExpensesData = [
    { month: "Sep", revenue: 45000, expenses: 28000 },
    { month: "Oct", revenue: 52000, expenses: 31000 },
    { month: "Nov", revenue: 48000, expenses: 29500 },
    { month: "Dec", revenue: 61000, expenses: 35000 },
    { month: "Jan", revenue: 58000, expenses: 33500 },
    { month: "Feb", revenue: 67000, expenses: 38000 },
  ];

  // Monthly Spend Breakdown Data
  const monthlySpendData = [
    { month: "Sep", fuel: 12000, maintenance: 8000, payroll: 8000, total: 28000 },
    { month: "Oct", fuel: 14000, maintenance: 9000, payroll: 8000, total: 31000 },
    { month: "Nov", fuel: 13500, maintenance: 8000, payroll: 8000, total: 29500 },
    { month: "Dec", fuel: 16000, maintenance: 11000, payroll: 8000, total: 35000 },
    { month: "Jan", fuel: 15500, maintenance: 10000, payroll: 8000, total: 33500 },
    { month: "Feb", fuel: 17000, maintenance: 13000, payroll: 8000, total: 38000 },
  ];

  // Efficiency Leaderboard Data
  const topPerformers = [
    { vehicleId: "VEH-001", plate: "BIKE-1122", efficiency: 28.4, trend: 8.2 },
    { vehicleId: "VEH-002", plate: "VAN-2891", efficiency: 13.2, trend: 5.1 },
    { vehicleId: "VEH-003", plate: "VAN-5634", efficiency: 12.8, trend: 2.3 },
    { vehicleId: "VEH-004", plate: "TRK-1456", efficiency: 11.5, trend: -1.2 },
    { vehicleId: "VEH-005", plate: "VAN-3421", efficiency: 10.9, trend: 3.4 },
  ];

  const bottomPerformers = [
    { vehicleId: "VEH-010", plate: "TRK-9988", efficiency: 5.2, trend: -12.5 },
    { vehicleId: "VEH-009", plate: "TRK-8877", efficiency: 6.1, trend: -8.3 },
    { vehicleId: "VEH-008", plate: "VAN-7766", efficiency: 6.8, trend: -5.7 },
    { vehicleId: "VEH-007", plate: "TRK-6655", efficiency: 7.3, trend: -3.2 },
    { vehicleId: "VEH-006", plate: "TRK-4523", efficiency: 7.8, trend: -2.1 },
  ];

  // Calculate KPIs
  const totalRevenue = revenueExpensesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueExpensesData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  const totalKmDriven = 125000;
  const avgCostPerKm = (totalExpenses / totalKmDriven).toFixed(2);

  const vehicleAcquisitionCost = 250000;
  const maintenanceROI = ((netProfit / vehicleAcquisitionCost) * 100).toFixed(1);

  const handleApplyFilters = (startDate: string, endDate: string, vehicleType: string) => {
    setDateRange({ start: startDate, end: endDate, vehicleType });
    toast.success("Filters applied successfully!", {
      description: `Showing data from ${startDate} to ${endDate}${vehicleType !== 'all' ? ` for ${vehicleType}s` : ''}`,
    });
  };

  // Export Functions
  const handleExportPDF = () => {
    toast.success("Generating PDF Report...");
    // In production: Use jsPDF library
  };

  const handleExportCSV = () => {
    const csvData = [
      ["Month", "Revenue", "Fuel", "Maintenance", "Payroll", "Total"],
      ...monthlySpendData.map((item) => [
        item.month,
        (revenueExpensesData.find((r) => r.month === item.month)?.revenue || 0),
        item.fuel,
        item.maintenance,
        item.payroll,
        item.total,
      ]),
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcope-financial-report.csv";
    a.click();
    toast.success("CSV exported successfully!");
  };

  const handlePrint = () => {
    window.print();
    toast.success("Opening print dialog...");
  };

  return (
    <div className="p-6">
      {/* Date Range Filter */}
      <DateRangeFilter onApply={handleApplyFilters} />

      {/* Top Row - Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Total Fleet Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}k`}
          subtitle="Last 6 months"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          valueColor="text-[#3B82F6] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          delay={0.1}
        />

        <KPICard
          title="Net Profit Margin"
          value={`${profitMargin}%`}
          subtitle={`$${(netProfit / 1000).toFixed(0)}k profit`}
          icon={TrendingUp}
          trend={{ value: 8.3, isPositive: true }}
          valueColor="text-[#10B981] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          delay={0.2}
        />

        <KPICard
          title="Avg. Cost per km"
          value={`$${avgCostPerKm}`}
          subtitle="Operational efficiency"
          icon={Gauge}
          trend={{ value: 3.2, isPositive: false }}
          valueColor="text-[#F59E0B] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          delay={0.3}
        />

        <KPICard
          title="Maintenance ROI"
          value={`${maintenanceROI}%`}
          subtitle="Asset health score"
          icon={Wrench}
          trend={{ value: 5.7, isPositive: true }}
          valueColor="text-[#06B6D4] drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueExpensesChart data={revenueExpensesData} />
        </div>

        <div>
          <EfficiencyLeaderboard
            topPerformers={topPerformers}
            bottomPerformers={bottomPerformers}
          />
        </div>
      </div>

      {/* Monthly Spend Breakdown */}
      <MonthlySpendChart data={monthlySpendData} />

      {/* Export Toolbar */}
      <ExportToolbar
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onPrint={handlePrint}
      />
    </div>
  );
}