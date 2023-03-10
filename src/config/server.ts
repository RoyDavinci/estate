import joi from 'joi';
import dotenv from 'dotenv-safe';

dotenv.config();
const envSchema = joi
  .object({
    NODE_ENV: joi.string().allow('development', 'production', 'test'),
    PORT: joi.string().required(),
    SECRET: joi.string().required(),
    SUPER_ADMIN_FIRSTNAME: joi.string().required(),
    SUPER_ADMIN_LASTNAME: joi.optional(),
    SUPER_ADMIN_EMAIL: joi.string().required(),
    SUPER_ADMIN_PASSWORD: joi.string().required(),
    SUPER_ADMIN_ROLE: joi.string().required(),
    JSON_TOKEN: joi.string().required(),
    TOKENEXPIRATIONTIME: joi.string().required(),
    PAYSTACK_SECRET: joi.string().required(),
    PAYSTACK_PUBLIC: joi.string().required(),
    FRONTEND_GUEST_HOST: joi.string().required(),
    FRONTEND_ADMIN_HOST: joi.string().required(),
    WELCOME_EMAIL_HEADER: joi.string().required(),
    DELETE_ACCOUNT_CODE: joi.string().required(),
    SUSPEND_ACCOUNT_CODE: joi.string().required(),
    BLOCK_ACCOUNT_CODE: joi.string().required(),
    ACTIVE_ACCOUNT_CODE: joi.string().required(),
  })
  .unknown();

/**
 * Validate the env variables using joi.validate()
 */
const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const serverConfig = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT || '3900',
    secret: envVars.SECRET,
    SUPER_ADMIN_FIRSTNAME: envVars.SUPER_ADMIN_FIRSTNAME,
    SUPER_ADMIN_LASTNAME: envVars.SUPER_ADMIN_LASTNAME,
    SUPER_ADMIN_EMAIL: envVars.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD: envVars.SUPER_ADMIN_PASSWORD,
    SUPER_ADMIN_ROLE: envVars.SUPER_ADMIN_ROLE,
    JSON_TOKEN: envVars.JSON_TOKEN,
    tokenExpirationTime: envVars.TOKENEXPIRATIONTIME,
    PAYSTACK_SECRET_KEY: envVars.PAYSTACK_SECRET,
    PAYSTACK_PUBLIC_KEY: envVars.PAYSTACK_PUBLIC,
    FRONTEND_GUEST_HOST: envVars.FRONTEND_GUEST_HOST,
    FRONTEND_ADMIN_HOST: envVars.FRONTEND_ADMIN_HOST,
    WELCOME_EMAIL_HEADER: envVars.WELCOME_EMAIL_HEADER,
    DELETE_ACCOUNT_CODE: envVars.DELETE_ACCOUNT_CODE,
    SUSPEND_ACCOUNT_CODE: envVars.SUSPEND_ACCOUNT_CODE,
    BLOCK_ACCOUNT_CODE: envVars.BLOCK_ACCOUNT_CODE,
    ACTIVE_ACCOUNT_CODE: envVars.ACTIVE_ACCOUNT_CODE,
  },
};

// export const serverConfig = {
//   serverConfig: {
//     secret: process.env.SECRET,
//     makeShiftConfig: 'bshibwbiiurbvuqoeuycvqbshubwybifuwpyfvuywouyuqwoeyfvwuo',
//     tokenExpirationTime: process.env.TOKENEXPIRATIONTIME,
//     adminEmail: process.env.SUPER_ADMIN_EMAIL,
//     adminPassword: process.env.SUPER_ADMIN_PASSWORD,
//     firstname: process.env.SUPER_ADMIN_FIRST_NAME,
//     lastname: process.env.SUPER_ADMIN_LAST_NAME,
//   },
// };

// REGISTERED_GUEST_ROLE_NAME: joi.string().required(),
//     DELETE_ACCOUNT_CODE: joi.string().required(),
//     SUSPEND_ACCOUNT_CODE: joi.string().required(),
//     BLOCK_ACCOUNT_CODE: joi.string().required(),
//     ACTIVE_ACCOUNT_CODE: joi.string().required(),
//     RESOURCE_KEY: joi.string().required(),
//     RESOURCE_KEY_EXPIRATION: joi.string().required(),
//     DEFAULT_PAGE_SIZE: joi.number().required(),
//     DEFAULT_ADMIN_PASSWORD: joi.string().required(),
//     REFERAL_REWARD_POINT: joi.number().required(),
//     PAYSTACK_SECRET: joi.string().required(),
//     PAYSTACK_PUBLIC: joi.string().required(),
//     FLUTTERWAVE_SECRET: joi.string().required(),
//     FLUTTERWAVE_PUBLIC: joi.string().required(),
//     FLUTTERWAVE_KEY: joi.string().required(),
//     REGISTERED_GUEST_ROLE_NAME: envVars.REGISTERED_GUEST_ROLE_NAME,
//     DELETE_ACCOUNT_CODE: envVars.DELETE_ACCOUNT_CODE,
//     SUSPEND_ACCOUNT_CODE: envVars.SUSPEND_ACCOUNT_CODE,
//     BLOCK_ACCOUNT_CODE: envVars.BLOCK_ACCOUNT_CODE,
//     ACTIVE_ACCOUNT_CODE: envVars.ACTIVE_ACCOUNT_CODE,
//     RESOURCE_KEY: envVars.RESOURCE_KEY,
//     RESOURCE_KEY_EXPIRATION: envVars.RESOURCE_KEY_EXPIRATION,
//     DEFAULT_PAGE_SIZE: envVars.DEFAULT_PAGE_SIZE,
//     DEFAULT_ADMIN_PASSWORD: envVars.DEFAULT_ADMIN_PASSWORD,
//     REFERAL_REWARD_POINT: envVars.REFERAL_REWARD_POINT,
//     PAYSTACK_SECRET_KEY: envVars.PAYSTACK_SECRET,
//     PAYSTACK_PUBLIC_KEY: envVars.PAYSTACK_PUBLIC,
//     FLUTTERWAVE_SECRET_KEY: envVars.FLUTTERWAVE_SECRET,
//     FLUTTERWAVE_PUBLIC_KEY: envVars.FLUTTERWAVE_PUBLIC,
//     FLUTTERWAVEKEY_KEY: envVars.FLUTTERWAVE_KEY,
//  TOKEN_EXPIRATION_TIME: joi.string(),
//     OTP_LENGTH: joi.number().required(),
//     iNVITE_LINK_LENGTH: joi.number().required(),
//     OTP_TTL: joi.number().required(),
//     OTP_EMAIL_HEADER: joi.string().required(),
//     FORGET_PASSWORD_TOKEN_EXPIRATION: joi.string().required(),
//     NEW_PASSWORD_EMAIL_HEADER: joi.string().required(),
//     FRONTEND_GUEST_HOST: joi.string().required(),
//     FRONTEND_ADMIN_HOST: joi.string().required(),
//     SIGN_OFF_EMAIL_HEADER: joi.string().required(),
//     tokenExpirationTime: envVars.TOKEN_EXPIRATION_TIME,
//     OTP_LENGTH: 4,
//     iNVITE_LINK_LENGTH: envVars.iNVITE_LINK_LENGTH,
//     OTP_TTL: envVars.OTP_TTL,
//     OTP_EMAIL_HEADER: envVars.OTP_EMAIL_HEADER,
//     FORGET_PASSWORD_TOKEN_EXPIRATION: envVars.FORGET_PASSWORD_TOKEN_EXPIRATION,
//     NEW_PASSWORD_EMAIL_HEADER: envVars.NEW_PASSWORD_EMAIL_HEADER,
//     FRONTEND_GUEST_HOST: envVars.FRONTEND_GUEST_HOST,
//     FRONTEND_ADMIN_HOST: envVars.FRONTEND_ADMIN_HOST,
//     SIGN_OFF_EMAIL_HEADER: envVars.SIGN_OFF_EMAIL_HEADER,
