import { useAuthStore } from "@/store/auth/useAuthStore";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import type { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { token, user } = useAuthStore();

  if (token && user) {
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

export default PublicRoute;
