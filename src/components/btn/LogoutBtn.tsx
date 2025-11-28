import { API } from "@/config/api";
import { ROUTES } from "@/constants/routes";
import { default as api } from "@/lib/axios";
import { showError, showSuccess } from "@/lib/toast";
import { useAuthStore } from "@/store/auth/useAuthStore";
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
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
