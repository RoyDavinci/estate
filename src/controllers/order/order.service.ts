import {Router} from 'express';
import * as controllers from './order.controllers';

const orderRouter = Router();

orderRouter.post('/create-order/:id', controllers.createOrders);

export default orderRouter;
