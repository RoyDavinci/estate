/* eslint-disable indent */
import {Request, Response} from 'express';
import {Prisma} from '@prisma/client';
import {prisma} from '../../db/prisma';
import {sendEmail} from '../../common/sendMail';
import {logger} from '../../utils/logger';
import HTTP_STATUS_CODE from '../../constants/httpCodes';

export const createOrders = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {email, name, phone, address} = req.body;

  try {
    const findProduct = await prisma.products.findUnique({
      where: {productId: Number(id)},
    });
    if (!findProduct)
      return res.status(400).json({message: 'product does not exist'});
    if (req.user) {
      const createOrder = await prisma.orders.create({
        data: {
          name,
          email,
          phone,
          address,
          total_amount: findProduct.price.toString(),
          userId: req.user.user_id,
          product_detail: JSON.stringify(findProduct),
        },
      });
      const body = `<html>
        <body>
            <div>
                <h1>Hi, ${name}, You have successfully made an order to house owners</h1>
                <h1>Your order is summarised below: </h1>
                <p>Amount :${findProduct.price}</p>
                <p>Location: ${findProduct.location}</p>
                <p>Description: ${
                  findProduct.description || 'House/Apartment'
                } </p>
                <p>Name: ${findProduct.productName}</p>
                <p>Order Id: ${createOrder.orderId}</p>
                <p>Address: ${address || 'Laspotech'}</p>
            </div>
        </body>
      </html>`;
      await sendEmail(email, 'Order Summary', body);

      return res.status(200).json({message: 'order created', createOrder});
    }
    const createGuest = await prisma.guest.create({
      data: {email, name, address, mobile: phone},
    });
    const createOrder = await prisma.orders.create({
      data: {
        name,
        email,
        phone,
        address,
        total_amount: findProduct.price.toString(),
        guestId: createGuest.id,
        product_detail: JSON.stringify(findProduct),
      },
    });

    const body = `<html>
        <body>
            <div>
                <h1>You have successfully made an order to house owners</h1>
                <h1>Your order is summarised below: </h1>
                <p>Amount :${findProduct.price}</p>
                <p>Location: ${findProduct.location}</p>
                <p>Description: ${findProduct.description}</p>
                <p>Name: ${findProduct.productName}</p>
                <p>Order Id: ${createOrder.orderId}</p>
            </div>
        </body>
      </html>`;
    await sendEmail(email, 'Order Summary', body);

    return res.status(200).json({message: 'order created', createOrder});
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        logger.info(
          'There is a unique constraint violation, a new user cannot be created with this email',
        );

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message:
            'There is a unique constraint violation, a new user cannot be created with this email',
        });
      }
      logger.info('known', e);

      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e});
    }
    logger.info('unknown', e);

    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({error: e, message: 'an error occured on creating a product'});
  }
};
