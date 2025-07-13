"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedRequest = void 0;
const logger_1 = require("../utils/logger");
const loggedRequest = (req, res, next) => {
    logger_1.loggerData.log('info', `Request method: ${req.method}, Request route: ${req.originalUrl}`);
    next();
};
exports.loggedRequest = loggedRequest;
