import {check, param} from 'express-validator';
import {validationErrorHandler} from '../../utils/validationErrorHandler';

export const createUserValidator = [
  check('email')
    .isEmail()
    .withMessage('email must be filled in valid mail format')
    .bail()
    .isString()
    .withMessage('email must be string')
    .bail()
    .notEmpty()
    .withMessage('email is required'),
  check('password')
    .isString()
    .withMessage('password is required')
    .bail()
    .isLength({min: 4})
    .withMessage('password must be longer than four characters'),
  check('firstname')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('firstname must be string'),
  check('role')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('role must be string'),
  check('lastname')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('role must be string'),
  validationErrorHandler,
];

export const updateUserValidation = [
  param('id')
    .isNumeric()
    .withMessage('id must be type number')
    .bail()
    .notEmpty()
    .withMessage('id param is required'),
  check('email')
    .optional({checkFalsy: true})
    .isEmail()
    .withMessage('email must be filled in valid mail format')
    .bail()
    .isString()
    .withMessage('email must be string')
    .bail()
    .notEmpty()
    .withMessage('email is required'),
  check('password')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('password is required')
    .bail()
    .isLength({min: 4})
    .withMessage('password must be longer than four characters'),
  check('firstname')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('firstname must be string'),
  check('role')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('role must be string'),
  check('lastname')
    .optional({checkFalsy: true})
    .isString()
    .withMessage('role must be string'),
  validationErrorHandler,
];
export const validateDeleteUser = [
  param('id')
    .isNumeric()
    .withMessage('id must be type number')
    .bail()
    .notEmpty()
    .withMessage('id param is required'),
  validationErrorHandler,
];
export const validateGetSingleUser = [
  param('id')
    .isNumeric()
    .withMessage('id must be type number')
    .bail()
    .notEmpty()
    .withMessage('id param is required'),
  validationErrorHandler,
];
