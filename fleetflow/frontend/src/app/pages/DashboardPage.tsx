import { useAuth } from "../context/AuthContext";
import { ManagerDashboard } from "./dashboards/ManagerDashboard";
import { DispatcherDashboard } from "./dashboards/DispatcherDashboard";
import { SafetyOfficerDashboard } from "./dashboards/SafetyOfficerDashboard";
import { FinancialAnalystDashboard } from "./dashboards/FinancialAnalystDashboard";

export function DashboardPage() {
  const { user } = useAuth();

  // Dashboard Switcher - Route to role-specific dashboard
  switch (user?.role) {
    case "MANAGER":
      return <ManagerDashboard />;
    case "DISPATCHER":
      return <DispatcherDashboard />;
    case "SAFETY_OFFICER":
      return <SafetyOfficerDashboard />;
    case "FINANCIAL_ANALYST":
      return <FinancialAnalystDashboard />;
    default:
      return null;
  }
}