import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4, "OTP must be at least 4 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
