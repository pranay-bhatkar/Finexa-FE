import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { useFormValidator } from "@/hooks/usFormValidator";
import AuthLayout from "@/layout/AuthLayout";
import { showError, showSuccess } from "@/lib/toast";
import { registerSchema } from "@/schema/auth/register.schema";
import { authService } from "@/services/auth.service";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { form, onChange, errors, validate } = useFormValidator(
    registerSchema,
    { name: "", email: "", password: "" }
  );

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await authService.register(form);

      if (res.status === "success") {
        showSuccess("Account created successfully!");
        // Optionally redirect user to login page
        navigate(ROUTES.AUTH.LOGIN);
      } else {
        showError(res.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey with Finexa"
    >
      <form onSubmit={handleRegister} className="space-y-6 text-white">
        {/* Full Name */}
        <div>
          <label className="text-sm text-slate-200">Name</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-3 mt-1">
            <User className="text-white/60 w-5 h-5" />
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              type="text"
              autoComplete="off"
              placeholder="Enter your name"
              className="bg-transparent text-white w-full outline-none ml-3 placeholder-white/40"
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

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
              autoComplete="off"
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
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={onChange}
              placeholder="Enter your Password"
              className="bg-transparent text-white w-full outline-none ml-3 placeholder-white/40"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-12 text-white/60 hover:text-white cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password[0]}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full py-3 bg-linear-to-r from-[#0A2540] to-[#00D1B2] text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
        >
          {loading ? "Creating account..." : "Register"}
        </motion.button>

        <p className="text-center text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
