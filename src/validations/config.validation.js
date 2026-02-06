import { formatValidationError } from "#utils/format.js";
import { LanguageSchema } from "#schema/config.schema.js";

export const validateLanguage = (req, res, next) => {
    const validationResult = LanguageSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Language validation failed",
            details: formatValidationError(validationResult.error),
        });
    }

    req.body = validationResult.data;

    next();
}
