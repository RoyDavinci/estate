/* eslint-disable @typescript-eslint/naming-convention */
import {PassportStatic} from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import bcrypt from 'bcryptjs';
import {prisma} from '../db/prisma';

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JSON_TOKEN,
};

export const passportService = (passport: PassportStatic) => {
  passport.use(
    new passportJwt.Strategy(options, async (payload, done) => {
      const user = await prisma.users.findUnique({
        where: {user_id: Number(payload.user_id)},
      });
      if (!user) return done(null, false, {message: 'user does not exist'});

      return done(null, user, {message: 'user authenticated'});
    }),
  );

  passport.use(
    new passportLocal.Strategy(
      {
        usernameField: process.env.MODEL_EMAIL_FIELD,
        passwordField: process.env.MODEL_PASSWORD_FIELD,
      },
      async (username, password, done) => {
        try {
          const user = await prisma.users.findUnique({
            where: {email: username},
          });
          if (!user)
            return done(null, false, {
              message: `${username} is not a registered account`,
            });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return done(null, false, {
              message: `password is incorrect`,
            });
          if (user.accountStatus === 123456789) {
            return done(null, false, {message: 'user has been blacklisted'});
          }

          return done(null, user, {message: 'authenticated successfully'});
        } catch (error) {
          return done(error, false, {message: 'Error processing your info'});
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {user_id} = user;
    done(null, user_id);
  });

  passport.deserializeUser(async (user_id, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: {user_id: Number(user_id)},
      });

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  });
};
