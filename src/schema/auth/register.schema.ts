import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
