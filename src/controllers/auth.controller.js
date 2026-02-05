import logger from "#config/logger.js";
import { formatValidationError } from "#utils/format.js";
import { signUpSchema } from "#validations/auth.validation.js";
import { hashPassword } from "#utils/auth.js";
import { jwttoken } from "#utils/jwt.js";
import db from "#models/index.js";

export const signup = async (req, res, next) => {
    try {
        const validationResult = signUpSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: formatValidationError(validationResult.error),
            });
        }

        const { name, email, password, role } = validationResult.data;

        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await db.Users.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        logger.info(`User registered successfully: ${email}`);

        res.status(201).json({
            message: "User registered",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (e) {
        logger.error("Signup error", e);
        next(e);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwttoken.sign({ id: user.id });

        cookies.set(res, "access_token", token);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (e) {
        next(e);
    }
};
