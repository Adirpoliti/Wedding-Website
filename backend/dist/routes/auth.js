"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passportInit_1 = __importDefault(require("../middleware/passportInit"));
const requiredAuth_1 = require("../middleware/requiredAuth");
const checkAdmin_1 = require("../middleware/checkAdmin");
const authLogic_1 = require("../logic/authLogic");
const router = express_1.default.Router();
// const FRONTEND_URL = "https://wedding-frontend-f6rv.onrender.com";
const FRONTEND_URL = "http://localhost:5173";
router.get("/google", passportInit_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", (req, res, next) => {
    passportInit_1.default.authenticate("google", { session: false }, (err, user, info) => {
        if (err || !user || typeof user !== "object" || !("id" in user)) {
            return res.redirect(`${FRONTEND_URL}/?login=failed`);
        }
        console.log("Authenticated user:", user);
        const token = (0, authLogic_1.createJwtForUser)(user.id);
        const redirectUrl = `${FRONTEND_URL}/gallery?token=${token}`;
        res.redirect(redirectUrl);
    })(req, res, next);
});
router.get("/me", requiredAuth_1.requireAuth, (req, res) => {
    const user = req.user;
    res.json({
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
    });
});
router.get("/admin/secret", requiredAuth_1.requireAuth, checkAdmin_1.checkAdmin, (req, res) => {
    res.json({ message: "You are an admin!", user: req.user });
});
exports.default = router;
