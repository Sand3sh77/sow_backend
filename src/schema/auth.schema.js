import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().max(255).trim(),
    email: z.email().max(255).toLowerCase().trim(),
    password: z.string().min(6).max(128),
    location: z.string().max(255).trim().optional(),
    avatar: z.string().max(255).trim().optional(),
});

export const LoginSchema = z.object({
    email: z.email().max(255).toLowerCase().trim(),
    password: z.string().min(6).max(128),
});
