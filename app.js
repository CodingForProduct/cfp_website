var express = require('express');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var KnexSessionStore = require('connect-session-knex')(session);
var db = require('./config/database');

// express
var app = express();

require('./config/passport')(passport);

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// read cookies (needed for auth)
app.use(cookieParser());

 // get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the folder for  static assets
app.use(express.static(path.join(__dirname, 'public')));

// store session in database
var store = new KnexSessionStore({
    knex: db,
    tablename: 'sessions' // optional. Defaults to 'sessions'
});

// required for passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: store
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// use connect-flash for flash messages stored in session
app.use(flash());

// routes
require('./app/routes')(app, passport);

app.listen(process.env.PORT, () => {
  console.log('server started on port ' + process.env.PORT);
});
