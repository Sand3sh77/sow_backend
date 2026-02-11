import logger from '#config/logger.js';
import { Language, Translation, TranslationKey } from '#models/index.js';

export const getTranslations = async (req, res) => {
  try {
    const { lang } = req.params;

    const translations = await Translation.findAll({
      include: [
        { model: Language, where: { code: lang }, attributes: [] },
        { model: TranslationKey, attributes: ['key'] },
      ],
    });

    const result = {};
    translations.forEach(t => {
      result[t.TranslationKey.key] = t.text;
    });

    res.json({
      language: lang,
      translations: result,
    });
  } catch (e) {
    logger.error('Get translations error', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addOrUpdateTranslation = async (req, res) => {
  try {
    const { key, language, text } = req.body;

    const lang = await Language.findOne({
      where: { code: language },
    });

    if (!lang) {
      return res.status(404).json({
        message: `Language '${language}' not found`,
      });
    }

    const [translationKey] = await TranslationKey.findOrCreate({
      where: { key },
    });

    const existingTranslation = await Translation.findOne({
      where: {
        language_id: lang.id,
        translation_key_id: translationKey.id,
      },
    });

    let translation;
    if (existingTranslation) {
      translation = await existingTranslation.update({ text });
    } else {
      translation = await Translation.create({
        text,
        language_id: lang.id,
        translation_key_id: translationKey.id,
      });
    }

    res.status(200).json({
      message: 'Translation saved successfully',
      data: {
        key,
        language,
        text: translation.text,
      },
    });
  } catch (e) {
    logger.error('Add/Update translation error', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};
