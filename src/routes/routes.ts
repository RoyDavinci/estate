import {Router} from 'express';
import adminRouter from '../controllers/admin/admin.service';
import userRouter from '../controllers/auth/auth.service';
import orderRouter from '../controllers/order/order.service';

const apiV1Router = Router();

apiV1Router.use('/user', userRouter);
apiV1Router.use('/admin', adminRouter);
apiV1Router.use('/order', orderRouter);

export default apiV1Router;
