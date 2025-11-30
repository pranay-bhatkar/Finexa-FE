import { ROUTES } from "@/constants/routes";
import { useFormValidator } from "@/hooks/usFormValidator";
import AuthLayout from "@/layout/AuthLayout";
import { showError, showSuccess } from "@/lib/toast";
import { Lock, KeyRound, EyeOff, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "@/schema/resetPassword.schema";
import { authService } from "@/services/auth.service";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || ""; // from forgot page

  const { form, onChange, errors, validate } = useFormValidator(
    resetPasswordSchema,
    {
      email,
      otp: "",
      newPassword: "",
    }
  );

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await authService.resetPassword(form);

      showSuccess("Password reset successful!");
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err: any) {
      showError(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter OTP and your new password"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        {/* OTP */}
        <div>
          <label className="text-sm text-slate-200">OTP</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-3 mt-1">
            <KeyRound className="text-white/60 w-5 h-5" />
            <input
              name="otp"
              value={form.otp}
              onChange={onChange}
              type="text"
              placeholder="Enter the OTP"
              className="bg-transparent text-white w-full outline-none ml-3 placeholder-white/40"
            />
          </div>
          {errors.otp && (
            <p className="text-red-400 text-sm mt-1">{errors.otp[0]}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm text-slate-200">Password</label>

          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-3 mt-1">
            <Lock className="text-white/60 w-5 h-5" />

            <input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={form.newPassword}
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

          {errors.newPassword && (
            <p className="text-red-400 text-sm">{errors.newPassword[0]}</p>
          )}
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full py-3 bg-linear-to-r from-[#0A2540] to-[#00D1B2] text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
