import { DataTypes } from 'sequelize';
import { sequelize } from '../src/config/database.js';

const TranslationKey = sequelize.define(
  'TranslationKey',
  {
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: DataTypes.STRING,
  },
  {
    tableName: 'TranslationKeys',
    timestamps: true,
  }
);

TranslationKey.associate = models => {
  TranslationKey.hasMany(models.Translation, {
    foreignKey: 'translation_key_id',
  });
};

export default TranslationKey;
