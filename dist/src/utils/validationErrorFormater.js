"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorErrorFormater = void 0;
const validatorErrorFormater = (initialErrorFormat) => {
    return initialErrorFormat.map((errorObj) => {
        return errorObj.msg;
    });
};
exports.validatorErrorFormater = validatorErrorFormater;
