import {check} from 'express-validator';
import {validationErrorHandler} from '../../utils/validationErrorHandler';

export const createProductValidation = [
  check('productName')
    .isString()
    .withMessage('product name must be a string')
    .bail()
    .notEmpty()
    .withMessage('product name is required'),
  check('price')
    .notEmpty()
    .withMessage('price is required')
    .bail()
    .isString()
    .withMessage('price must be string'),
  check('location')
    .notEmpty()
    .withMessage('location is required')
    .bail()
    .isString()
    .withMessage('location should be string'),
  check('description')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('description must be string'),
  check('title')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('description must be string'),
  validationErrorHandler,
];
