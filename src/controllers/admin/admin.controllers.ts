/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/naming-convention */
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Prisma, users} from '@prisma/client';
import {UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';
import {prisma} from '../../db/prisma';
import config from '../../config';
import {logger} from '../../utils/logger';
import HTTP_STATUS_CODE from '../../constants/httpCodes';
import {streamUpload} from '../../utils/streamifier';

export const createAdmin = async (req: Request, res: Response) => {
  const {email, firstname, lastname, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createNewAdmin = await prisma.admin.create({
      data: {email, firstname, lastname, role: 'Admin'},
    });
    const createUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        lastname,
        firstname,
        role: 'Admin',
        adminId: createNewAdmin.adminId,
      },
    });
    const token = jwt.sign(
      {
        user_id: createUser.user_id,
        email: createUser.email,
        role: createUser.role,
      },
      `${process.env.JSON_TOKEN}`,
      {expiresIn: config.server.tokenExpirationTime},
    );

    return res.status(200).json({
      message: 'agent created',
      createUser,
      token,
      validity: {expiresIn: config.server.tokenExpirationTime},
    });
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
      .json({error: e, message: 'an error occured on creating a user'});
  }
};

export const createProducts = async (req: Request, res: Response) => {
  const {productName, title, description, price, location} = req.body;
  try {
    if (req.user) {
      const {user_id} = req.user as unknown as users;
      const findAdmin = await prisma.users.findUnique({
        where: {user_id},
      });
      if (!findAdmin)
        return res.status(400).json({message: 'cannot find user'});
      if (findAdmin.role === 'Super_Admin' || findAdmin.role === 'Admin') {
        const newProduct = await prisma.products.create({
          data: {productName, title, description, price, location},
        });
        if (req.files) {
          (req.files as Express.Multer.File[]).map(
            // eslint-disable-next-line consistent-return
            async item => {
              const result = (await streamUpload(item.buffer)) as unknown as
                | UploadApiResponse
                | UploadApiErrorResponse;
              if (result.message)
                return res.status(result.http_code).json({
                  message: 'error using cloudinary upload',
                  data: result.message,
                });
              await prisma.imageUrl.create({
                data: {
                  url: result.secure_url,
                  productId: newProduct.productId,
                },
              });
            },
          );
        }

        return res.status(200).json({message: 'product created', newProduct});
      }

      return res.status(400).json({message: 'only admins can add products'});
    }

    return res.status(400).json({message: 'authentication needed'});
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
