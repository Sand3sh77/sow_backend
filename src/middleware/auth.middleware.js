
import { jwttoken } from "#utils/jwt.js";
import { User } from "#models/index.js";
import logger from "#config/logger.js";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "You are not authenticated!",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwttoken.verify(token);

        const user = await User.findByPk(decoded.id, {
            attributes: ["id"],
        });

        if (!user) {
            return res.status(401).json({
                message: "User no longer exists!",
            });
        }

        req.user = {
            id: user.id,
            role: user.role,
        };

        next();
    } catch (e) {
        logger.error("Token verify error", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyTokenAndAuthorization = async (req, res, next) => {
    try {
        await verifyToken(req, res, () => {
            const paramId = Number(req.params.id);

            if (!paramId) {
                return res.status(400).json({
                    message: "Please provide a valid id in params",
                });
            }

            if (req.user.id === paramId) {
                next();
            } else {
                return res.status(403).json({
                    message: "Unauthorized!",
                });
            }
        });
    } catch (e) {
        logger.error("User authorization error", e);
        res.status(500).json({ message: "Internal server error" });
    }
};
