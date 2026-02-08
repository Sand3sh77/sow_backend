import { formatValidationError } from "#utils/format.js";
import { LoginSchema, SignUpSchema } from "#schema/auth.schema.js";

export const validateUserSignUp = (req, res, next) => {
    const validationResult = SignUpSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "User signup validation failed",
            details: formatValidationError(validationResult.error),
        });
    }

    req.body = validationResult.data;

    next();
}

export const validateUserLogin = (req, res, next) => {
    const validationResult = LoginSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "User login validation failed",
            details: formatValidationError(validationResult.error),
        });
    }

    req.body = validationResult.data;

    next();
}
