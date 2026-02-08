import { formatValidationError } from "#utils/format.js";
import { TranslationSchema } from "#schema/translation.schema.js";

export const validateTranslation = (req, res, next) => {
    const validationResult = TranslationSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Translation validation failed",
            details: formatValidationError(validationResult.error),
        });
    }

    req.body = validationResult.data;

    next();
}
