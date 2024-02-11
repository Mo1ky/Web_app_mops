const router = require('express').Router();
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');
const { roles } = require('../utils/constants');

router.get(
  '/login',
  ensureLoggedOut({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('login');
  }
);

router.post(
  '/login',
  ensureLoggedOut({ redirectTo: '/auth/logout' }),
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);

// router.get(
//   '/register',
//   ensureLoggedIn({ redirectTo: '/' }),
//   async (req, res, next) => {
//     res.render('register');
//   }
// );

router.post(
  '/register',
  ensureLoggedIn({ redirectTo: '/auth/register' }),
  ensureAdmin,
  registerValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('register', {
          username: req.body.username,
          messages: req.flash(),
        });
        return;
      }

      const { username } = req.body;
      // console.log(req.body)
      const doesExist = await User.findOne({ username });
      if (doesExist) {
        req.flash('warning', 'Пользователь с таким именем уже существует');
        res.redirect('/');
        return;
      }
      const user = new User(req.body);
      await user.save();
      req.flash(
        'success',
        `${user.username} зарегистрирован`
      );
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/logout',
  ensureLoggedIn({ redirectTo: '/' }),
  async (req, res, next) => {
    req.logout();
    res.redirect('/');
  }
);

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'Нет доступа');
    res.redirect('/');
  }
}

module.exports = router;