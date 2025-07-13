"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateGoogleUser = findOrCreateGoogleUser;
exports.createJwtForUser = createJwtForUser;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function findOrCreateGoogleUser(profile) {
    let user = await User_1.default.findOne({ googleId: profile.id });
    if (!user) {
        user = await User_1.default.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            avatar: profile.photos?.[0].value,
            role: 'User',
        });
    }
    return user;
}
function createJwtForUser(userId) {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}
