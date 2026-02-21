import api from './api';

export interface DashboardData {
  kpis: {
    utilizationRate: number;
    maintenanceQueue: number;
    urgentMaintenance: number;
    avgFleetHealth: number;
    criticalAlerts: number;
    totalVehicles: number;
  };
  utilizationData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  healthTrendData: Array<{
    month: string;
    health: number;
  }>;
  maintenanceHeatmap: Array<{
    type: string;
    scheduled: number;
    urgent: number;
    completed: number;
    health: number;
  }>;
}

export interface DispatcherDashboardData {
  kpis: {
    activeTrips: number;
    pendingCargo: number;
    availableVehicles: number;
    availableDrivers: number;
  };
  cargoQueue: Array<{
    id: string;
    origin: string;
    destination: string;
    weight: number;
    priority: string;
    eta: string;
  }>;
  activeTrips: Array<{
    id: string;
    vehicle: string;
    driver: string;
    progress: number;
    eta: string;
  }>;
  tripStats: Array<{
    day: string;
    completed: number;
    pending: number;
  }>;
}

export interface SafetyDashboardData {
  kpis: {
    totalDrivers: number;
    activeDrivers: number;
    avgSafetyScore: number;
    expiringLicenses: number;
    expiredLicenses: number;
    suspendedDrivers: number;
  };
  safetyDistribution: Array<{
    range: string;
    count: number;
    color: string;
  }>;
  driverPerformance: Array<{
    name: string;
    safetyScore: number;
    completionRate: number;
    totalTrips: number;
    status: string;
    licenseExpiry: Date;
  }>;
}

export interface FinancialDashboardData {
  kpis: {
    totalExpenses: number;
    fuelExpenses: number;
    maintenanceExpenses: number;
    avgFuelPrice: number;
  };
  expenseBreakdown: Array<{
    category: string;
    amount: number;
    color: string;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    fuel: number;
    maintenance: number;
    other: number;
  }>;
  topSpendingVehicles: Array<{
    name: string;
    type: string;
    total: number;
  }>;
}

export const dashboardService = {
  async getManagerDashboard(): Promise<DashboardData> {
    const response = await api.get<{ success: boolean; data: DashboardData }>('/dashboard/manager');
    return response.data.data;
  },

  async getDispatcherDashboard(): Promise<DispatcherDashboardData> {
    const response = await api.get<{ success: boolean; data: DispatcherDashboardData }>('/dashboard/dispatcher');
    return response.data.data;
  },

  async getSafetyDashboard(): Promise<SafetyDashboardData> {
    const response = await api.get<{ success: boolean; data: SafetyDashboardData }>('/dashboard/safety');
    return response.data.data;
  },

  async getFinancialDashboard(): Promise<FinancialDashboardData> {
    const response = await api.get<{ success: boolean; data: FinancialDashboardData }>('/dashboard/financial');
    return response.data.data;
  },
};
