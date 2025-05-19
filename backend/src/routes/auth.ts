import express from 'express';
import passport from '../middleware/passportInit';
import { googleCallback } from '../controllers/authController';
import { requireAuth } from 'middleware/requiredAuth';
import { checkAdmin } from 'middleware/checkAdmin';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

router.get('/me', requireAuth, (req, res) => {
  const user = (req as any).user;

  res.json({
    googleId: user.googleId,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
  });
});

router.get('/admin/secret', requireAuth, checkAdmin, (req, res) => {
  res.json({ message: 'You are an admin!', user: (req as any).user });
});

export default router;