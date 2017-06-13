var User = require('./models/user');
var Team = require('./models/team');
var _ = require('lodash');

module.exports = function(app, passport) {
  app.get('/admin', isAdmin, (request, response) => {
    response.render('admin', { currentUser: request.user });
  })


  app.get('/admin/newUser', isAdmin, (request, response) => {
    response.render('admin/newUser', { currentUser: request.user });
  })

  app.post('/admin/newUser', (request, response) => {
    User.create(request.body)
      .then((res) => {
        if(res) {
          response.redirect('/users')
        } else {
          response.redirect('/admin/newUser');
        }

      })
  })

  app.get('/', (request, response) => {
    response.render('home', { currentUser: request.user });
  });

  app.get('/coding_exercise', (request, response) => {
    response.render('coding_exercise', { currentUser: request.user });
  });

  app.get('/workshop_summary', (request, response) => {
    response.render('workshop_summary', { currentUser: request.user });
  });

  app.get('/users', isLoggedIn, (request, response) => {
    User.findAll()
    .then(users => {
      response.render('users', { users, currentUser: request.user });
    })
  });

  app.get('/users/:id', isLoggedIn, (request, response) => {
    User.findOne('id', request.params.id)
    .then(user => {
      response.render('user', { user, currentUser: request.user });
    })
  });

  app.get('/teams', (request, response) => {
    Team.assignments()
    .then(results => {
      const rows = results.rows;
      const assignments = _.groupBy(rows, 'team_name')
            console.log(assignments)

      response.render('teams', { assignments, currentUser: request.user })
    })
  })


  app.get('/setPassword', isLoggedOut, function(request, response) {
    response.render('set_password', { message: request.flash('setPassword'), currentUser: null });
  });


  app.post('/setPassword', isLoggedOut, function(request, response) {
    if(request.body.password !== request.body.confirm_password) {
      request.flash('setPassword', 'passwords do not match')
      response.redirect('/setPassword');
    }

    User.setPassword(request.body.email, request.body.password)
    .then((user) => {
      if(user) {
        request.flash('loginMessage', 'password set')
      } else {
        request.flash('loginMessage', 'password can not be reset')
      }

      response.redirect('/login');
    })
  });

  app.get('/login', isLoggedOut, function(request, response) {
    response.render('login', { message: request.flash('loginMessage'), currentUser: null });
  });

  app.post('/login',isLoggedOut, passport.authenticate('local-login', {
    failureRedirect: '/login',
    successRedirect: '/users'
  }));

  app.get('/logout', isLoggedIn, function(request, response) {
    request.logout();
    response.redirect('/');
  });
}

function isAdmin(req, res, next) {
  // if user is  admin, carry on
  if (req.isAuthenticated() && req.user.admin) { return next(); }
  // if they aren't redirect them
  res.redirect('/');
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) { return next(); }
  // if they aren't redirect them
  res.redirect('/login');
}

function isLoggedOut(req, res, next) {
  // if user is not  authenticated in the session, carry on
  if (!req.isAuthenticated()) { return next(); }
  // if they are, redirect them
  res.redirect('/');
}
