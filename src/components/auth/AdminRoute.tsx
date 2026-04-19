import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent-maroon-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (!hasRole("admin")) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

export default AdminRoute;
