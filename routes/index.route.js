const router = require('express').Router();
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const Object = require('../models/object.model');
const { roles } = require('../utils/constants');

router.get('/', ensureLoggedIn({ redirectTo: '/auth/login' }), async (req, res, next) => {
    try {
      if (req.user.role === roles.admin || req.user.role === roles.master) {
        const objects = await Object.find()
        res.render('system', { objects })
      }
      else {
        const objects = await Object.find({client_login: req.user.username})
        res.render('system', { objects })
      }
    } catch (error) {
      next(error);
    }
});

module.exports = router;
