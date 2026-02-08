import logger from "#config/logger.js";
import { Language } from "#models/index.js";

export const getConfig = async (req, res) => {
    try {
        const languages = await Language.findAll();

        res.status(200).json({
            message: "Success",
            configs: {
                languages
            }
        });
    } catch (e) {
        logger.error("Get language error", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addLanguage = async (req, res) => {
    try {
        const { code, name, icon } = req.body;

        const existingLanguage = await Language.findOne({ where: { code } });
        if (existingLanguage) {
            return res.status(409).json({ message: "Language already exists" });
        }

        const language = await Language.create({ code, name, icon });

        res.status(200).json({
            message: "Success",
            languages: [language]
        });
    } catch (e) {
        logger.error("Post language error", e);
        res.status(500).json({ message: "Internal server error" });
    }
};
