import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { z } from "zod";
import { authService } from "@/services/auth.service";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useFormValidator } from "@/hooks/usFormValidator";
import AuthLayout from "@/layout/AuthLayout";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { ROUTES } from "@/constants/routes";
import { showError, showSuccess } from "@/lib/toast";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const { form, onChange, errors, validate } = useFormValidator(loginSchema, {
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await authService.login(form);

      if (res.status === "success" && res.data?.token) {
        const token = res.data.token;
        const refreshToken = res.data.refreshToken;
        const user = res.data.user;

        // Store tokens
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        // Zustand
        login(
          {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role.toLowerCase() as "admin" | "user",
          },
          token
        );

        showSuccess("Login successful!");
        navigate(
          user.role.toLowerCase() === "admin"
            ? ROUTES.ADMIN_DASHBOARD
            : ROUTES.DASHBOARD
        );
      } else {
        showError(res.message || "Login failed");
      }
    } catch (err: unknown) {
      // Safe error handling
      let message = "Login failed";

      if (err instanceof AxiosError) {
        // Backend error message
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      console.error("Login failed:", err);
      showError(message); // Shows "Invalid credentials" or "User not found"
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your Finexa account">
      <form onSubmit={handleSubmit} className="space-y-6 text-white" noValidate>
        {/* Email */}
        <div>
          <label className="text-sm text-slate-200">Email</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-3 mt-1">
            <Mail className="text-white/60 w-5 h-5" />
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-white w-full outline-none ml-3 placeholder-white/40"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-slate-200">Password</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-3 mt-1">
            <Lock className="text-white/60 w-5 h-5" />
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              placeholder="Enter your password"
              className="bg-transparent text-white w-full outline-none ml-3 placeholder-white/40"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full py-3 bg-linear-to-r from-[#0A2540] to-[#00D1B2] text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
        >
          {loading ? "Processing..." : "Login"}
        </motion.button>

        <p className="text-center text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
