import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { findOrCreateGoogleUser } from '../logic/authLogic';

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',
  },
  async (_accessToken, _refreshToken, profile, done) => {
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

    try {
      const user = await findOrCreateGoogleUser(profile);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
));