import {check} from 'express-validator';

export const createOrder = [
  check('name')
    .isString()
    .withMessage('name must be string')
    .bail()
    .notEmpty()
    .withMessage('name is required')
    .bail(),
  check('email')
    .isString()
    .withMessage('email must be string')
    .bail()
    .notEmpty()
    .withMessage('email is required')
    .bail(),
  check('phone')
    .isString()
    .withMessage('phone must be string')
    .bail()
    .notEmpty()
    .withMessage('phone is required')
    .bail(),
  check('address')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('phone must be string')
    .bail(),
];
