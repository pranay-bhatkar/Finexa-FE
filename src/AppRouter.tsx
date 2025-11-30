import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import AdminDashboardPage from "./pages/dashboard/AdminDashboard";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFound";
import NotificationsPage from "./pages/notofications/NotificationPage";
import { useAuthStore } from "./store/auth/useAuthStore";
import PrivateRoute from "./wrappers/PrivateRoutes";
import PublicRoute from "./wrappers/PublicRoute";
import ProfilePage from "./pages/profile/Profilepage";

const AppRouter = () => {
  const RootRedirect = () => {
    const { token, user } = useAuthStore();

    if (!token || !user) return <LandingPage />; // show landing for guests

    return (
      <Navigate
        to={
          user.role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD
        }
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
        <Route
          path={ROUTES.AUTH.RESET_PASSWORD}
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}

        {/* User routes */}
        <Route
          path={ROUTES.USER.ROOT}
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<div>Transaction Page</div>} />
          <Route path="categories" element={<div>Category Page</div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Admin routes */}
        <Route
          path={ROUTES.ADMIN.ROOT}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<div>Users Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="profile" element={<div>Profile Page</div>} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
