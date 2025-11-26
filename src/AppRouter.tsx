import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import PublicRoute from "./wrappers/PublicRoute";
import LoginPage from "./pages/auth/LoginPage";
import PrivateRoute from "./wrappers/PrivateRoutes";
import DashboardPage from "./pages/dashboard/DashboardPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import AdminDashboardPage from "./pages/dashboard/AdminDashboard";
import NotFoundPage from "./pages/NotFound";
import { useAuthStore } from "./store/auth/useAuthStore";
import LandingPage from "./pages/LandingPage";

const AppRouter = () => {
  const RootRedirect = () => {
    const { token, user } = useAuthStore();

    if (!token || !user) return <LandingPage />; // show landing for guests

    return (
      <Navigate
        to={user.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.DASHBOARD}
        replace
      />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* root route */}
        <Route path="/" element={<RootRedirect />} />

        {/* public routes */}
        <Route
          path={ROUTES.AUTH.LOGIN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.AUTH.REGISTER}
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
