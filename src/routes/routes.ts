import {Router} from 'express';
import adminRouter from '../controllers/admin/admin.service';
import userRouter from '../controllers/auth/auth.service';

const apiV1Router = Router();

apiV1Router.use('/user', userRouter);
apiV1Router.use('/admin', adminRouter);

export default apiV1Router;
