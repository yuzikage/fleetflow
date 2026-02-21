import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNotifications } from "./NotificationContext";

interface TripUpdate {
  id: string;
  status: string;
  revenue?: number;
  completedBy?: string;
  timestamp: number;
}

interface FleetDataContextType {
  recentTripUpdates: TripUpdate[];
  addTripUpdate: (update: Omit<TripUpdate, "timestamp">) => void;
  maintenanceAlerts: any[];
  safetyAlerts: any[];
  revenueEvents: any[];
}

const FleetDataContext = createContext<FleetDataContextType | undefined>(undefined);

export function FleetDataProvider({ children }: { children: ReactNode }) {
  const { addNotification } = useNotifications();
  const [recentTripUpdates, setRecentTripUpdates] = useState<TripUpdate[]>([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<any[]>([]);
  const [safetyAlerts, setSafetyAlerts] = useState<any[]>([]);
  const [revenueEvents, setRevenueEvents] = useState<any[]>([]);

  // Add trip update and trigger cross-role notifications
  const addTripUpdate = (update: Omit<TripUpdate, "timestamp">) => {
    const fullUpdate = {
      ...update,
      timestamp: Date.now(),
    };

    setRecentTripUpdates((prev) => [fullUpdate, ...prev.slice(0, 9)]);

    // If trip completed, notify Financial Analyst
    if (update.status === "Completed" && update.revenue) {
      const revenueEvent = {
        id: `rev-${Date.now()}`,
        tripId: update.id,
        amount: update.revenue,
        timestamp: Date.now(),
      };
      
      setRevenueEvents((prev) => [revenueEvent, ...prev]);

      // Send notification to financial users
      addNotification({
        type: "general",
        title: "New Revenue Log",
        message: `Trip ${update.id} completed. Revenue: $${update.revenue}`,
        priority: "low",
        link: "/analytics",
      });
    }
  };

  // Simulate real-time data polling (in production, use WebSocket or React Query)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate backend polling - in production, this would be an API call
      // This is just for demonstration of the real-time bridge concept
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <FleetDataContext.Provider
      value={{
        recentTripUpdates,
        addTripUpdate,
        maintenanceAlerts,
        safetyAlerts,
        revenueEvents,
      }}
    >
      {children}
    </FleetDataContext.Provider>
  );
}

export function useFleetData() {
  const context = useContext(FleetDataContext);
  if (context === undefined) {
    throw new Error("useFleetData must be used within a FleetDataProvider");
  }
  return context;
}
