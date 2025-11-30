import { API } from "@/config/api";
import { ROUTES } from "@/constants/routes";
import { default as api } from "@/lib/axios";
import { showError, showSuccess } from "@/lib/toast";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { LogOut } from "lucide-react";
import { useState } from "react";

const LogoutButton = () => {
  const logoutStore = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken"); // use refresh token

      if (refreshToken) {
        await api.post(API.auth.logout, { refreshToken });
        showSuccess("Logged out successfully!");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      showError(err instanceof Error ? err.message : "Failed to logout");
    } finally {
      // Clear frontend state and storage
      logoutStore();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // delete axios.defaults.headers.common["Authorization"];

      // 2. Fully reload the page to clear any in-memory caches, Axios headers, etc.

      window.location.href = ROUTES.AUTH.LOGIN;
      // navigate(ROUTES.AUTH.LOGIN);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`
        flex items-center gap-2 justify-center
        bg-brand-accent hover:bg-brand-accent/90
        text-brand-midnight font-semibold
        py-2 px-4 rounded md:w-full
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200 cursor-pointer
      `}
    >
      <LogOut className="w-4 h-4" />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
