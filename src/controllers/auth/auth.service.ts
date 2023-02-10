import {Router} from 'express';
import {authenticateLocal} from '../../common/authenticate';
import * as controllers from './auth.controllers';
import * as middlewares from './auth.middlewares';

const userRouter = Router();

userRouter.post(
  '/create',
  middlewares.createUserValidator,
  controllers.createNewUser,
);
userRouter.get('/users', controllers.getAllUsers);
userRouter.get(
  '/:id',
  middlewares.validateGetSingleUser,
  controllers.getSingleUser,
);
userRouter.patch(
  '/:id',
  middlewares.updateUserValidation,
  controllers.updateUser,
);
userRouter.delete(
  '/:id',
  middlewares.validateDeleteUser,
  controllers.deleteUser,
);
userRouter.patch(
  '/blacklist/:id',
  middlewares.validateGetSingleUser,
  controllers.blacklistUser,
);
userRouter.patch(
  '/reinstate/:id',
  middlewares.validateGetSingleUser,
  controllers.reinstateUser,
);
userRouter.post('/login', authenticateLocal, controllers.login);

export default userRouter;
