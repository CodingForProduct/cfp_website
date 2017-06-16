var User = require('./models/user');
var Team = require('./models/team');
var _ = require('lodash');

module.exports = function(app, passport) {
  app.get('/admin', isAdmin, (request, response) => {
    response.render('admin',
      { currentUser: request.user,
        layout: 'layouts/admin_layout'
      });
  })

  app.get('/admin/newUser', isAdmin, (request, response) => {
    Team.findAll()
    .then((teams) => {
      response.render('admin/newUser',
        { currentUser: request.user ,
          layout: 'layouts/admin_layout',
          message: [],
          teams
        }
      );
    })
  })

  app.post('/admin/newUser', isAdmin, (request, response) => {
    request.checkBody('email', 'email is required').notEmpty();
    request.checkBody('email', 'Invalid email').isEmail();
    request.checkBody('name', 'name is required').notEmpty();
    request.checkBody('programming_experience', 'programming experience is required').notEmpty();
    request.checkBody('languages', 'languages is required').notEmpty();
    request.checkBody('github_username', 'github username is required').notEmpty();

    var errors = request.validationErrors();
    if (errors) {
      Team.findAll()
      .then((teams) => {
        response.render('admin/newUser',
          { currentUser: request.user ,
            layout: 'layouts/admin_layout',
            message: errors.map(error => error.msg),
            teams
          }
        );
      })
    } else {
      User.create(request.body)
      .then((res) => {
        response.redirect('/users')
      })
    }
  });
}

function isAdmin(req, res, next) {
  // if user is  admin, carry on
  if (req.isAuthenticated() && req.user.admin) { return next(); }
  // if they aren't redirect them
  res.redirect('/');
}
