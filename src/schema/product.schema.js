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

export const EditProductSchema = z.object({
    article_no: z.number().int().positive().optional(),
    name: z.string().min(1).optional(),
    in_price: z.number().positive().optional(),
    price: z.number().positive().optional(),
    unit: z.string().min(1).optional(),
    in_stock: z.number().int().nonnegative().optional(),
    description: z.string().min(1).optional(),
});
