import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import {logger} from './utils/logger';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 3900;

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server listening on http://localhost:${PORT}`);
});
