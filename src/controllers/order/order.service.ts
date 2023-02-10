import {Router} from 'express';
import * as controllers from './order.controllers';
import * as middlewares from './order.middlewares';

const orderRouter = Router();

orderRouter.post(
  '/create-order/:id',
  middlewares.createOrder,
  controllers.createOrders,
);

export default orderRouter;
