import z from "zod"

export const profileSchema = z.object({
    name: z.string().min(2,"Name must be at least 2 character"),
    email: z.string().email("Invalid email format")
})

export type ProfileForm = z.infer<typeof profileSchema>;

