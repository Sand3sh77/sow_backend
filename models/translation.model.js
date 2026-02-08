import { DataTypes } from 'sequelize';
import { sequelize } from '../src/config/database.js';

const Translation = sequelize.define(
    "Translation",
    {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        language_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        translation_key_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'Translations',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["language_id", "translation_key_id"],
            },
        ],
    }
);

Translation.associate = (models) => {
    Translation.belongsTo(models.Language, {
        foreignKey: "language_id",
    });

    Translation.belongsTo(models.TranslationKey, {
        foreignKey: "translation_key_id",
    });
};

export default Translation;
