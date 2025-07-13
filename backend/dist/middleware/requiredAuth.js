"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const ErrorModel_1 = require("../models/ErrorModel");
const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer '))
            throw (0, ErrorModel_1.UnauthorizedError)('No token');
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyJwt)(token);
        const user = await User_1.default.findById(decoded.userId);
        if (!user)
            throw (0, ErrorModel_1.UnauthorizedError)('User not found');
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ error: err.message || 'Unauthorized' });
    }
};
exports.requireAuth = requireAuth;
