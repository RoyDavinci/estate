import passport, {PassportStatic} from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import {prisma} from '../db/prisma';
import bcrypt from 'bcryptjs';
import {users} from '@prisma/client';

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

export const passportService = (passport: PassportStatic) => {
  passport.use(
    new passportJwt.Strategy(options, async (payload, done) => {
      const user = await prisma.users.findUnique({
        where: {user_id: Number(payload.id)},
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
      async (email, password, done) => {
        try {
          const user = await prisma.users.findUnique({
            where: {email: email},
          });
          if (!user)
            return done(null, false, {
              message: `${email} is not a registered account`,
            });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return done(null, false, {
              message: `password is incorrect`,
            });
          return done(null, user, {message: 'authenticated successfully'});
        } catch (error) {
          return done(error, false, {message: 'Error processing your info'});
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    const {user_id} = user as unknown as users;
    done(null, user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: {user_id: Number(id)},
      });
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  });
};
