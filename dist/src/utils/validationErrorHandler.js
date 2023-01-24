"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = void 0;
const express_validator_1 = require("express-validator");
const httpCodes_1 = __importDefault(require("../constants/httpCodes"));
const validationErrorFormater_1 = require("./validationErrorFormater");
const validationErrorHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(httpCodes_1.default.BAD_REQUEST).json({
            success: false,
            message: "validation error",
            data: (0, validationErrorFormater_1.validatorErrorFormater)(errors.array()),
        });
    return next();
};
exports.validationErrorHandler = validationErrorHandler;
