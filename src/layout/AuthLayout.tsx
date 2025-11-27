import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-black p-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl font-semibold text-white text-center">
          {title}
        </h2>

        {subtitle && (
          <p className="text-slate-300 text-center mt-2">{subtitle}</p>
        )}

        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  );
}
