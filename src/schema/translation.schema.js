import z from 'zod';

export const TranslationSchema = z.object({
  key: z.string().max(255).toLowerCase().trim(),
  language: z.string().max(255).toLowerCase().trim(),
  text: z.string().max(255).trim(),
});
