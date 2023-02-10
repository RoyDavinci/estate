import {Router} from 'express';
import multer from 'multer';
import {authenticateJWT} from '../../common/authenticate';
import * as controllers from './admin.controllers';
import * as middlewares from './admin.middlewares';

const adminRouter = Router();
const fileUpload = multer();

adminRouter.post(
  '/create',
  fileUpload.array('product'),
  authenticateJWT,
  middlewares.createProductValidation,
  controllers.createProducts,
);

export default adminRouter;
