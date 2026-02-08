import { formatValidationError } from "#utils/format.js";
import { ProductSchema } from "#schema/product.schema.js";

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
