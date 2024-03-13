const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, {
            message: 'Пользователь не зарегистрирован',
          });
        }
        const isMatch = await user.isValidPassword(password);
        return isMatch
          ? done(null, user)
          : done(null, false, { message: 'Неверный пароль' });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
