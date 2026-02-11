import { formatValidationError } from "#utils/format.js";
import { EditProductSchema, ProductSchema } from "#schema/product.schema.js";

export const validateProduct = (req, res, next) => {
    const validationResult = ProductSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Product validation failed",
            details: formatValidationError(validationResult.error),
        });
    }

    req.body = validationResult.data;

    next();
}

export const validateEditProduct = (req, res, next) => {
    const validationResult = EditProductSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Product edit validation failed",
            details: formatValidationError(validationResult.error),
        });
    }

    req.body = validationResult.data;

    next();
}
