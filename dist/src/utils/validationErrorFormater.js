"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorErrorFormater = void 0;
const validatorErrorFormater = (initialErrorFormat) => initialErrorFormat.map(errorObj => errorObj.msg);
exports.validatorErrorFormater = validatorErrorFormater;
