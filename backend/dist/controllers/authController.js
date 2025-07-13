"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = void 0;
const authLogic_1 = require("../logic/authLogic");
const googleCallback = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Google login failed' });
        return;
    }
    // @ts-ignore
    const token = (0, authLogic_1.createJwtForUser)(req.user._id.toString());
    res.json({ token });
};
exports.googleCallback = googleCallback;
