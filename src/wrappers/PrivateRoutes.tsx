import { useAuthStore } from "@/store/auth/useAuthStore";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: ("admin" | "user")[]; // allowed roles for this route
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { token, user } = useAuthStore();

  if (!token || !user) {
    // not logged in
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // redirect user to their "default" dashboard based on role
    return (
      <Navigate
        to={
          user.role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD
        }
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
