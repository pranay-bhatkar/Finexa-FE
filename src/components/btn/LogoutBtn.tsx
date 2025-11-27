import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios"; // configured axios instance
import { API } from "@/config/api";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";

export default function LogoutButton() {
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken"); // use refresh token

      if (refreshToken) {
        await axios.post(API.auth.logout, { refreshToken });
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // clear state and storage
      logoutStore();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate(ROUTES.AUTH.LOGIN); // navigate to login page
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
}
