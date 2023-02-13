import axios from 'axios';
import {NextFunction, Request, Response} from 'express';
import {v4 as uuid} from 'uuid';
import {logger} from '../../common/logger';
import {sendEmail} from '../../common/sendMail';
import config from '../../config';
import HTTP_STATUS_CODE from '../../constants/httpCodes';
import {prisma} from '../../db/prisma';
import {
  paystackResponse,
  paystackResponseVerification,
} from './transactions.interfaces';

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
export const verifyTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {transactionId} = req.params;

  try {
    const getTransaction = await prisma.transaction.findUnique({
      where: {id: Number(transactionId)},
    });
    if (!getTransaction)
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({message: 'transaction does not exist'});

    const {data} = await axios.get(
      `https://api.paystack.co/transaction/verify/${getTransaction.biller_Reference}`,
      {
        headers: {
          Authorization: `Bearer ${config.server.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const response = data as paystackResponseVerification;
    if (response.data.status === 'success') {
      try {
        const updateTransaction = await prisma.transaction.update({
          where: {id: Number(transactionId)},
          data: {status: 'successful'},
        });
        const updateOrder = await prisma.orders.update({
          where: {orderId: getTransaction.orderId},
          data: {status: 'successful'},
        });
        Promise.all([updateTransaction, updateOrder]);
        const details = {
          name: updateOrder.name,
          email: updateOrder.email,
          amount: updateOrder.total_amount,
          status: updateOrder.status,
        };
        const sendMail = await sendEmail(
          getTransaction.email,
          'Transaction Details',
          `<html>
                        <body>
                            <p>name: ${details.name}</p>
                            <p>email: ${details.email}</p>
                            <p>Total Amount: ${details.amount}</p>
                            <p>Status: ${details.status}</p>
                        </body>
                    
                    </html>`,
        );

        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({
          status: response.status,
          message: response.message,
          sendMail,
        });
      } catch (error) {
        logger.error(error);

        return next({
          message: 'error processing your data at this time',
          error,
        });
      }
    }

    const updateTransaction = await prisma.transaction.update({
      where: {id: Number(transactionId)},
      data: {status: 'failed'},
    });

    const updateOrder = await prisma.orders.update({
      where: {orderId: getTransaction.orderId},
      data: {status: 'failed'},
    });

    Promise.all([updateTransaction, updateOrder]);

    return res
      .status(HTTP_STATUS_CODE.ACCEPTED)
      .json({status: false, message: response.message});
  } catch (error) {
    logger.error(error);

    return next({message: 'error processing your data at this time', error});
  }
};
