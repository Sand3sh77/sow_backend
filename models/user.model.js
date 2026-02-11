import { DataTypes } from 'sequelize';
import { sequelize } from '../src/config/database.js';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: DataTypes.STRING,
    avatar: DataTypes.STRING,
  },
  {
    tableName: 'Users',
    timestamps: true,
  }
);

User.associate = models => {
  User.hasMany(models.Product, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
};

export default User;
