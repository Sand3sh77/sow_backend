import { Sequelize } from 'sequelize';

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const env = process.env.NODE_ENV;

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: env === 'development' ? console.log : false,
});

export async function initDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log('DB synced!');
  } catch (err) {
    console.error(err);
  }
}
