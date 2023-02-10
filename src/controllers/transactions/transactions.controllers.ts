import axios from 'axios';
import {Request, Response} from 'express';
import {v4 as uuid} from 'uuid';
import {logger} from '../../common/logger';
import config from '../../config';
import HTTP_STATUS_CODE from '../../constants/httpCodes';
import {prisma} from '../../db/prisma';
import {paystackResponse} from './transactions.interfaces';

export const createTransactions = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const checkOrder = await prisma.orders.findUnique({
      where: {orderId: Number(id)},
    });
    if (!checkOrder)
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({message: 'order does not exist'});
    const {data} = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {amount: checkOrder.total_amount, email: checkOrder.email},
      {
        headers: {
          Authorization: `Bearer ${config.server.PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    const response = data as paystackResponse;
    if (response.status) {
      const createTransaction = await prisma.transaction.create({
        data: {
          orderId: checkOrder.orderId,
          total_amount: checkOrder.total_amount,
          biller_Reference: response.data.reference,
          email: checkOrder.email || '',
          phone: checkOrder.phone,
          status: 'pending',
          transaction_reference: uuid(),
        },
      });

      return res.status(200).json({
        link: response.data.authorization_url,
        transactionId: createTransaction.id,
      });
    }

    return res.status(400).json({message: 'an error occured', data});
  } catch (error) {
    logger.info(error);

    return res.status(400).json({message: 'an error occuredd', error});
  }
};
