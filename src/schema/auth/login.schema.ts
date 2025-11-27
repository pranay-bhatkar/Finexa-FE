import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be 6 characters long"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
