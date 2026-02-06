import logger from "#config/logger.js";
import { hashPassword, verifyPassword } from "#utils/auth.js";
import { jwttoken } from "#utils/jwt.js";
import { User } from "#models/index.js";
import { cookies } from "#utils/cookies.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
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
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
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
            token,
        });
    } catch (e) {
        logger.error("Login error", e);
        res.status(500).json({ message: "Internal server error" });
    }
};
