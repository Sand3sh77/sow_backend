import { z } from "zod";

export const UserSchema = z.object({
    email: z.email().max(255).toLowerCase().trim(),
    password: z.string().min(6).max(128),
});
