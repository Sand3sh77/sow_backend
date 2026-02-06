import { z } from "zod";

export const LanguageSchema = z.object({
    code: z.string().max(255).toLowerCase().trim(),
    name: z.string().max(255).toLowerCase().trim(),
    icon: z.string().max(255).toLowerCase().trim(),
});
