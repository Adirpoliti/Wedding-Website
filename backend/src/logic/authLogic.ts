import User from '../models/User';
import { Profile } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';

export async function findOrCreateGoogleUser(profile: Profile) {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      avatar: profile.photos?.[0].value,
      role: 'User',
    });
  }

  return user;
}

export function createJwtForUser(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
}