"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const authLogic_1 = require("../logic/authLogic");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    try {
        const user = await (0, authLogic_1.findOrCreateGoogleUser)(profile);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
