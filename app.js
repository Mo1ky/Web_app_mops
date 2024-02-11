const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const connectMongo = require('connect-mongo');
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('./utils/constants');

// Init
const app = express();
// app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Session
const MongoStore = connectMongo(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
//главная
app.use('/', require('./routes/index.route'));
//аунтефикация
app.use('/auth', require('./routes/auth.route'));
//админ фичи
app.use(
  '/admin',
  ensureLoggedIn({ redirectTo: '/' }),
  ensureAdmin,
  require('./routes/admin.route')
);

app.use(
  '/orders',
  ensureLoggedIn({ redirectTo: '/' }),
  require('./routes/orders.route')
);

// 404
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', { error });
});

//PORT
const PORT = process.env.PORT || 3000;

//MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server start - http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err.message));

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }
// }

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'Нет доступа');
    res.redirect('/');
  }
}

function ensureMaster(req, res, next) {
  if (req.user.role === roles.master) {
    next();
  } else {
    req.flash('warning', 'Нет доступа');
    res.redirect('/');
  }
}