import express from "express";
import passport from "../middleware/passportInit";
import { requireAuth } from "../middleware/requiredAuth";
import { checkAdmin } from "../middleware/checkAdmin";
import { createJwtForUser } from "../logic/authLogic";

const router = express.Router();

const FRONTEND_URL = "https://wedding-frontend-f6rv.onrender.com";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user || typeof user !== "object" || !("id" in user)) {
      return res.redirect(`${FRONTEND_URL}/?login=failed`);
    }

    console.log("Authenticated user:", user);

    const token = createJwtForUser(user.id as string);
    const redirectUrl = `${FRONTEND_URL}/gallery?token=${token}`;
    res.redirect(redirectUrl);
  })(req, res, next);
});

router.get("/me", requireAuth, (req, res) => {
  const user = (req as any).user;

  res.json({
    googleId: user.googleId,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
  });
});

router.get("/admin/secret", requireAuth, checkAdmin, (req, res) => {
  res.json({ message: "You are an admin!", user: (req as any).user });
});

export default router;
