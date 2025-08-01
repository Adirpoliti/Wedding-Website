"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: String,
    avatar: String,
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
