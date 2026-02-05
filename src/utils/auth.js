import bcrypt from "bcrypt";
import logger from "#config/logger.js";

export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (e) {
        logger.error(`Error hashing password: ${e}`);
        throw new Error("Error hashing");
    }
};

export const verifyPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (e) {
        logger.error(`Error verifying password: ${e}`);
        throw new Error("Error verifying");
    }
};
