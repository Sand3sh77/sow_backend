import { z } from "zod";

export const ProductSchema = z.object({
    article_no: z.number().int().positive(),
    name: z.string().min(1),
    in_price: z.number().positive(),
    price: z.number().positive(),
    unit: z.string().min(1),
    in_stock: z.number().int().nonnegative(),
    description: z.string().min(1),
});
