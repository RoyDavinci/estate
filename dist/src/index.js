"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = require("./utils/logger");
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./common/passport");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
(0, passport_2.passportService)(passport_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
    logger_1.logger.info(`⚡️[server]: Server listening on http://localhost:${PORT}`);
});
