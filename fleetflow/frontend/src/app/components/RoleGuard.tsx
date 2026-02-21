import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth, UserRole } from "../context/AuthContext";
import { ForbiddenModal } from "./ForbiddenModal";
import { useState, useEffect } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export function RoleGuard({ children, allowedRoles, redirectTo }: RoleGuardProps) {
  const { user, hasRole } = useAuth();
  const [showForbidden, setShowForbidden] = useState(false);

  useEffect(() => {
    if (user && !hasRole(allowedRoles)) {
      setShowForbidden(true);
    }
  }, [user, allowedRoles, hasRole]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!hasRole(allowedRoles)) {
    const defaultRedirect = getDefaultRoute(user.role);
    
    return (
      <>
        <ForbiddenModal
          isOpen={showForbidden}
          onClose={() => {
            setShowForbidden(false);
          }}
          redirectTo={redirectTo || defaultRedirect}
        />
        <Navigate to={redirectTo || defaultRedirect} replace />
      </>
    );
  }

  return <>{children}</>;
}

// Helper function to get default route based on role
function getDefaultRoute(role: UserRole): string {
  const routes: Record<UserRole, string> = {
    MANAGER: "/dashboard",
    DISPATCHER: "/trips",
    SAFETY_OFFICER: "/drivers",
    FINANCIAL_ANALYST: "/analytics",
  };
  return routes[role];
}
