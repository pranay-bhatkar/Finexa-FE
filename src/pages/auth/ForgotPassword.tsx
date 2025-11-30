import { ROUTES } from "@/constants/routes";
import { useFormValidator } from "@/hooks/usFormValidator";
import AuthLayout from "@/layout/AuthLayout";
import { showError, showSuccess } from "@/lib/toast";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "@/schema/forgotPassword.schema";
import { authService } from "@/services/auth.service";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { form, onChange, errors, validate } = useFormValidator(
    forgotPasswordSchema,
    { email: "" }
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await authService.forgotPassword(form.email);

      showSuccess("OTP sent to your email!");

      navigate(ROUTES.AUTH.RESET_PASSWORD, {
        state: { email: form.email }, // pass email forward
      });
    } catch (err: any) {
      showError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive an OTP"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <div>
          <label className="text-sm text-slate-200">Email</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-3 mt-1">
            <Mail className="text-white/60 w-5 h-5" />
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Enter your email"
              autoComplete="off"
              className="
                  bg-transparent border-none outline-none ring-0 
                  focus-visible:ring-0 focus:ring-0 focus:border-none 
                  focus:outline-none shadow-none
                  text-white placeholder:text-white/40 ml-3 pr-10
                "
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full py-3 bg-linear-to-r from-[#0A2540] to-[#00D1B2] text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
