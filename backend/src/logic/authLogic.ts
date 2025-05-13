import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { Profile } from 'passport-google-oauth20';

export async function findOrCreateGoogleUser(profile: Profile) {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      avatar: profile.photos?.[0].value,
    });
  }

  return user;
}

export function createJwtForUser(userId: string) {
  return generateToken(userId);
}