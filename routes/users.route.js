const router = require('express').Router();
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');

router.get('/', ensureLoggedIn({ redirectTo: '/auth/login' }), (req, res, next) => {
  
  res.render('users');
});

module.exports = router;
