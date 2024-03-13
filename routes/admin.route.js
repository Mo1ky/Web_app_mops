const User = require('../models/user.model');
const Object = require('../models/object.model');
const router = require('express').Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const { objectValidator } = require('../utils/validators');
const { body, validationResult } = require('express-validator');

router.get(
  '/users', 
  async (req, res, next) => {
    try {
      const users = await User.find();
      // res.send(users);
      res.render('users', { users });
    } catch (error) {
      next(error);
    }
});

router.post(
  '/newObject',
  objectValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('/', {
          username: req.body.username,
          messages: req.flash(),
        });
        return;
      }
    
    const { object_name } = req.body;
    const { client_login } = req.body;
    const doesObjectExist = await Object.findOne({ object_name });
    const username = client_login
    const doesClientExist = await User.findOne({ username });
    if (doesObjectExist) {
      req.flash('warning', 'Объект с таким именем уже существует');
      res.redirect('/');
      return;
    }
    if (!doesClientExist) {
      req.flash('warning', 'Пользователя с таким логином не существует');
      res.redirect('/admin/users');
      return;
    }
    const object = new Object(req.body);
      await object.save();
      req.flash(
        'success',
        `${object.object_name} создан`
      );
      res.redirect('/');

    } catch (error) {
      next(error);
    }
});

module.exports = router;
