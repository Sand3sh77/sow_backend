import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import logger from '#config/logger.js';
import { initDB } from '#config/database.js';

import authRoutes from '#routes/auth.routes.js';
import configRoutes from '#routes/config.routes.js';
import translationRoutes from '#routes/translation.routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}))

initDB();

app.get('/', (req, res) => {
  logger.info('Hello World!');
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);
app.use('/api/translation', translationRoutes);

export default app;
