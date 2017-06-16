var express = require('express');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var KnexSessionStore = require('connect-session-knex')(session);
var expressLayouts = require('express-ejs-layouts');
var validator = require('express-validator');

var db = require('./config/database');
require('./config/passport')(passport);

// express
var app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// add layout support
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// read cookies (needed for auth)
app.use(cookieParser());

 // get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// form validator
app.use(validator());

// set the folder for  static assets
app.use(express.static(path.join(__dirname, 'public')));

// store session in database (needed for auth)
var store = new KnexSessionStore({
    knex: db,
    tablename: 'sessions'
});

// required for passport (needed for auth)
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: store
}));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

// use connect-flash for flash messages stored in session
app.use(flash());

// routes
require('./app/routes')(app, passport);

// start server
app.listen(process.env.PORT, () => {
  console.log('server started on port ' + process.env.PORT);
});
