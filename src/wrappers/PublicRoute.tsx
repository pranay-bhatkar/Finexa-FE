import { useAuthStore } from "@/store/auth/useAuthStore";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import type { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    // User is logged in, redirect to dashboard
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute;
