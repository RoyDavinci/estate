import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import {v2 as cloudinary} from 'cloudinary';
import {logger} from './utils/logger';
import {passportService} from './common/passport';
import config from './config';
import apiV1Router from './routes/routes';
import sessionInstance from './common/session';
import serviceNotFoundHandler from './common/serviceNotFoundHandler';
import {createSuperAdmin} from './db/createSuperAdmin';

dotenv.config();

const app = express();

cloudinary.config({
  cloud_name: config.cloudinaryConfig.name,
  api_key: config.cloudinaryConfig.api_key,
  api_secret: config.cloudinaryConfig.api_secret,
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
app.use(sessionInstance);
createSuperAdmin();
passportService(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', apiV1Router);
app.use(serviceNotFoundHandler);

const PORT = process.env.PORT || 3900;

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server listening on http://localhost:${PORT}`);
});
