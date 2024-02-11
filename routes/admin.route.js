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
    
    console.log(req.body)
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

//обновление ролей и что-то еще (не подключено)
// router.get('/user/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       req.flash('error', 'Неверный id');
//       res.redirect('/admin/users');
//       return;
//     }
//     const person = await User.findById(id);
//     res.render('profile', { person });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/update-role', async (req, res, next) => {
//   try {
//     const { id, role } = req.body;


//     if (!id || !role) {
//       req.flash('error', 'Неверный запрос');
//       return res.redirect('back');
//     }


//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       req.flash('error', 'Неверный id');
//       return res.redirect('back');
//     }


//     const rolesArray = Object.values(roles);
//     if (!rolesArray.includes(role)) {
//       req.flash('error', 'Неверная роль');
//       return res.redirect('back');
//     }


//     if (req.user.id === id) {
//       req.flash(
//         'error',
//         'Администраторы не могут удалить себя из списка администраторов, обратитесь к другому администратору.'
//       );
//       return res.redirect('back');
//     }


//     const user = await User.findByIdAndUpdate(
//       id,
//       { role },
//       { new: true, runValidators: true }
//     );

//     req.flash('info', `Обновлена роль для ${user.email} на ${user.role}`);
//     res.redirect('back');
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
