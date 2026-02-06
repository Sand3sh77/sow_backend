import User from './user.model.js';
import Language from './language.model.js';
import Translation from './translation.model.js';
import TranslationKey from './translationKey.model.js';

Language.associate?.({ Translation });
TranslationKey.associate?.({ Translation });
Translation.associate?.({ Language, TranslationKey });

export { User, Language, Translation, TranslationKey };
