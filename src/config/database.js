import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('sow_app_db', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
});

export async function initDB() {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB synced!');
    } catch (err) {
        console.error(err);
    }
}
