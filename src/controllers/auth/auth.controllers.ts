/* eslint-disable @typescript-eslint/naming-convention */
import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Prisma, users} from '@prisma/client';
import {prisma} from '../../db/prisma';
import {logger} from '../../common/logger';
import config from '../../config';
import HTTP_STATUS_CODE from '../../constants/httpCodes';

export const createNewUser = async (req: Request, res: Response) => {
  const {firstname, lastname, email, password} = req.body;

  try {
    const checkUser = await prisma.users.findUnique({where: {email}});
    if (checkUser)
      return res
        .status(HTTP_STATUS_CODE.FORBIDDEN)
        .json({message: 'user already exists'});
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await prisma.subscribers.create({
      data: {email, firstname, lastname},
    });
    await prisma.users.create({
      data: {
        email,
        firstname,
        lastname,
        password: hashedPassword,
        subscriberId: createUser.subscriberId,
      },
    });
    const token = jwt.sign(
      {id: createUser.subscriberId, email},
      `${process.env.JSON_TOKEN}`,
    );

    return res
      .status(HTTP_STATUS_CODE.ACCEPTED)
      .json({message: 'user created', createUser, token});
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

      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e});
    }

    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({error: e, message: 'an error occured on creating a user'});
  }
};

export const login = async (req: Request, res: Response) => {
  if (!req.user) return {message: 'no user'};
  const {user_id, adminId, subscriberId} = req.user;
  try {
    let additionInfo;
    let email;
    let role;
    if (adminId) {
      const findAdmin = await prisma.admin.findUnique({where: {adminId}});
      if (!findAdmin)
        return res.status(400).json({message: 'invalid admin id'});
      additionInfo = findAdmin;
      email = findAdmin.email;
      role = findAdmin.role;
    }
    if (subscriberId) {
      const findSubscriber = await prisma.subscribers.findUnique({
        where: {subscriberId},
      });
      if (!findSubscriber)
        return res.status(400).json({message: 'invalid subscriber id'});
      additionInfo = findSubscriber;
      email = findSubscriber.email;
      role = findSubscriber.role;
    }
    const token = jwt.sign(
      {id: user_id, email, role},
      `${process.env.JSON_TOKEN}`,
      {expiresIn: config.serverConfig.tokenExpirationTime},
    );
    const user = await prisma.users.findUnique({where: {user_id}});
    if (!user) return res.status(400).json({message: 'user not found'});

    req.logIn(user, err => {
      // <-- Errors on this line
      if (err) {
        return res.status(400).json({message: 'an error occured on signout'});
      }

      return res.status(200).json({
        success: true,
        token,
        validity: config.serverConfig.tokenExpirationTime,
        data: {user},
      });
    });

    return res.status(200).json({
      success: true,
      token,
      validity: config.serverConfig.tokenExpirationTime,
      data: {user: additionInfo},
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
          success: false,
        });
      }

      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e});
    }

    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: e,
      message: 'an error occured on creating a user',
      success: false,
    });
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.session) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      req.session.destroy(() => {});
      res.clearCookie('connect.sid');
    }
    req.logOut(err => {
      if (err)
        return res.status(400).json({message: 'an error occured on signout'});

      return res
        .status(200)
        .json({success: true, message: 'signed out successfully'});
    });

    return res
      .status(200)
      .json({success: true, message: 'signed out successfully'});
  } catch (error) {
    logger.error(error);

    return next({
      message: 'error processing your data at this time',
      success: false,
      error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return {message: 'no user'};
  const {user_id, role} = req.user;
  const {id} = req.params;
  try {
    if (user_id === Number(id) || role === 'Super_Admin') {
      const user = await prisma.users.findUnique({
        where: {user_id: Number(id)},
      });
      if (!user) return {message: 'user not found'};
      await prisma.users.delete({where: {user_id: Number(id)}});

      return res.status(200).json({message: 'user deleted'});
    }

    return res.status(200).json({
      message: 'user can only be deleted by themeslves or a super admun',
    });
  } catch (error) {
    logger.error(error);

    return next({
      message: 'error processing your data at this time',
      success: false,
      error,
    });
  }
};

export const blacklistUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return {message: 'no user'};
  const {role} = req.user;
  const {id} = req.params;
  try {
    if (role === 'Super_Admin') {
      const user = await prisma.users.update({
        where: {user_id: Number(id)},
        data: {accountStatus: 123456789},
      });

      return res
        .status(200)
        .json({message: 'user blacklisted/suspended', user});
    }

    return res.status(200).json({
      message: 'user can only be blacklisted by a super admun',
    });
  } catch (error) {
    logger.error(error);

    return next({
      message: 'error processing your data at this time',
      success: false,
      error,
    });
  }
};
export const reinstateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return {message: 'no user'};
  const {role} = req.user;
  const {id} = req.params;
  try {
    if (role === 'Super_Admin') {
      const user = await prisma.users.update({
        where: {user_id: Number(id)},
        data: {accountStatus: 1234567890},
      });

      return res
        .status(200)
        .json({message: 'user blacklisted/suspended', user});
    }

    return res.status(200).json({
      message: 'user can only be blacklisted by a super admun',
    });
  } catch (error) {
    logger.error(error);

    return next({
      message: 'error processing your data at this time',
      success: false,
      error,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {email, password, firstname, lastname, role} = req.body;
  if (!req.user) return {message: 'no user'};
  const {user_id} = req.user;
  try {
    const findUser = await prisma.users.findUnique({where: {user_id}});
    if (!findUser)
      return res
        .status(HTTP_STATUS_CODE.FORBIDDEN)
        .json({message: 'user not found'});
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.users.update({
        where: {user_id},
        data: {email, firstname, lastname, password: hashedPassword, role},
      });

      return res.status(200).json({message: 'user updated'});
    }
    await prisma.users.update({
      where: {user_id},
      data: {email, firstname, lastname, role},
    });

    return res.status(200).json({message: 'user updated'});
  } catch (error) {
    logger.error(error);

    return next({
      message: 'error processing your data at this time',
      success: false,
      error,
    });
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {user_id} = req.user as unknown as users;
  try {
    const findUser = await prisma.users.findUnique({where: {user_id}});
    if (!findUser)
      return res
        .status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({message: 'user not found'});

    return res
      .status(HTTP_STATUS_CODE.ACCEPTED)
      .json({user: {findUser}, success: true});
  } catch (error) {
    logger.error(error);

    return next({
      message: 'error processing your data at this time',
      success: false,
      error,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fetchUsers = await prisma.users.findMany({});

    return res
      .status(HTTP_STATUS_CODE.ACCEPTED)
      .json({data: {fetchUsers}, success: true});
  } catch (error) {
    logger.error(error);

    return next({
      message: 'error processing your data at this time',
      success: false,
      error,
    });
  }
};
