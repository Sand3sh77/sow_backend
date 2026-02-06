import { DataTypes } from 'sequelize';
import { sequelize } from '../src/config/database.js';

const Language = sequelize.define('Language', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
}, {
    tableName: 'Languages',
    timestamps: true,
});

export default Language;
