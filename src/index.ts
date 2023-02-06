import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import {logger} from './utils/logger';
import passport from 'passport';
import {passportService} from './common/passport';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
passportService(passport);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3900;

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server listening on http://localhost:${PORT}`);
});
