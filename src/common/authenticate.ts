import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import STATUS_CODES from '../constants/httpCodes';

export const authenticateLocal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return passport.authenticate(
      'local',
      (error: Error, user, info: {message: string}) => {
        if (error)
          return next({
            statusCode: STATUS_CODES.FORBIDDEN,
            message: error.message,
          });
        if (!user)
          return next({
            statusCode: STATUS_CODES.NOT_FOUND,
            message: info.message,
          });

        return req.logIn(user, err => {
          if (err)
            return next({
              statusCode: STATUS_CODES.FORBIDDEN,
              message: err.message,
            });

          return next();
        });
      },
    )(req, res, next);
  } catch (error) {
    return next({
      message: 'wrong username/password',
      statusCode: STATUS_CODES.NOT_ACCEPTABLE,
    });
  }
};

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization)
    return next({
      statusCode: STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED,
      message: 'header token needed',
    });

  return passport.authenticate('jwt', (error: Error, user, info) => {
    if (error)
      return next({
        statusCode: STATUS_CODES.FORBIDDEN,
        message: error.message,
        data: 'error',
      });
    if (!user)
      return next({statusCode: STATUS_CODES.NOT_FOUND, message: info.message});

    return req.logIn(user, err => {
      if (err)
        return next({statusCode: STATUS_CODES.FORBIDDEN, message: err.message});

      return next();
    });
  })(req, res, next);
};

export const authenticateAdminJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization)
    return next({
      statusCode: STATUS_CODES.PROXY_AUTHENTICATION_REQUIRED,
      message: 'admin authorization needed',
    });

  return passport.authenticate('jwt', (error: Error, user, info) => {
    if (error)
      return next({statusCode: STATUS_CODES.FORBIDDEN, message: error.message});
    if (!user)
      return next({statusCode: STATUS_CODES.NOT_FOUND, message: info.message});
    if (!user.adminId)
      return next({
        statusCode: STATUS_CODES.FORBIDDEN,
        message: 'unauthorized',
      });

    return req.logIn(user, err => {
      if (err)
        return next({statusCode: STATUS_CODES.FORBIDDEN, message: err.message});

      return next();
    });
  })(req, res, next);
};
