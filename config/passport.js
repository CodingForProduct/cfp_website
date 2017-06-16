// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // Configure Passport authenticated session persistence.
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, done) {
    console.log('serializeUser:', user)
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    return User.findOne(id)
      .then(user => done(null, user))
      .catch(err => done(err))
  });


  // Configure the local strategy for use by Passport.
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    failureFlash : true,
     passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log('inside:', email, password)
    if (email) { email = email.toLowerCase(); }

    User.findOneWithPassword('email', email)
      .then((user) => {
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'login did not work'));
        }
        if (!User.validPassword(password, user.password)) {
          return done(null, false, req.flash('loginMessage', 'login did not work'));
        }
        return done(null, user)
      })
      .catch(err => {
        console.log('err', err)
        return done(err)
      })
  }));
};
