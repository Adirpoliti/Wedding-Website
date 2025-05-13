import express from 'express';
import passport from '../middleware/passportInit';
import { googleCallback } from '../controllers/authController';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

export default router;