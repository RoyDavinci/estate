"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const cloudinary_1 = require("cloudinary");
const logger_1 = require("./utils/logger");
const passport_2 = require("./common/passport");
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes/routes"));
const session_1 = __importDefault(require("./common/session"));
const serviceNotFoundHandler_1 = __importDefault(require("./common/serviceNotFoundHandler"));
const createSuperAdmin_1 = require("./db/createSuperAdmin");
dotenv_1.default.config();
const app = (0, express_1.default)();
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinaryConfig.name,
    api_key: config_1.default.cloudinaryConfig.api_key,
    api_secret: config_1.default.cloudinaryConfig.api_secret,
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(session_1.default);
(0, createSuperAdmin_1.createSuperAdmin)();
(0, passport_2.passportService)(passport_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api/v1', routes_1.default);
app.use(serviceNotFoundHandler_1.default);
const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
    logger_1.logger.info(`⚡️[server]: Server listening on http://localhost:${PORT}`);
});
