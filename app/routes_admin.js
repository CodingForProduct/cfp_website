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
  // teams index
  app.get('/admin/teams', isAdmin, (request, response) => {
    Team.findAll()
    .then((teams) => {
      response.render('admin/teams', {
        currentUser: request.user ,
        layout: 'layouts/admin_layout',
        message: [],
        teams
      })
    })
    .catch(err => console.log('Team.findAll err:',err));
  })

  // form for new team
  app.get('/admin/teams/new', isAdmin, (request, response) => {
    response.render('admin/teams/new', {
      currentUser: request.user ,
      layout: 'layouts/admin_layout',
      languages: Team.languages,
      programming_experiences: Team.programming_experiences,
      team: {},
      message: [],
    });
  })

  // create new team
  app.post('/admin/teams', isAdmin, (request, response) => {
    request.checkBody('name', 'name is required').notEmpty();
    request.checkBody('programming_experience', 'programming experience is required').notEmpty();
    request.checkBody('languages', 'languages is required').notEmpty();

    var errors = request.validationErrors();
    if (errors) {
      response.render('admin/teams/new', {
        currentUser: request.user ,
        layout: 'layouts/admin_layout',
        languages: Team.languages,
        programming_experiences: Team.programming_experiences,
        team: {},
        message: errors.map(error => error.msg),
      });
    } else {
      Team.create(request.body)
      .then((res) => {
        response.redirect('/admin/teams')
      })
      .catch(err => console.log('Team.create err:', err));
    }
  });

  // form for editing team
  app.get('/admin/teams/:id/edit', (request, response) => {
    Team.findOne(request.params.id)
    .then(team => {
        response.render('admin/teams/edit', {
          currentUser: request.user,
          layout: 'layouts/admin_layout',
          message: [],
          team,
          languages,
          programming_experiences,
        })
    })
    .catch(err => console.log('User.findOne err:', err))
  })

  // edit team
  app.post('/admin/teams/:id/edit', (request, response) => {
    Team.update(request.params.id, request.body)
    .then(res => {
      Team.findAll()
      .then(teams => {
        response.render('admin/teams', {
          currentUser: request.user,
          layout: 'layouts/admin_layout',
          message: 'Team is updated',
          teams
        })
      })
      .catch(err => console.log('User.findAll err:', err))
    })
    .catch(err => console.log('User.edit err:', err))
  })

  // delete team
  app.post('/admin/teams/:id/delete', (request, response) => {
    Team.deleteOne(request.params.id)
    .then(res => {
        Team.findAll()
        .then(teams => {
          response.render('admin/teams', {
            currentUser: request.user,
            layout: 'layouts/admin_layout',
            message: 'Team is updated',
            teams
          })
        })
        .catch(err => console.log('User.findAll err:', err))
    })
    .catch(err => console.log('Team.deleteOne err:', err))
  })


}



function isAdmin(req, res, next) {
  // if user is  admin, carry on
  if (req.isAuthenticated() && req.user.admin) { return next(); }
  // if they aren't redirect them
  res.redirect('/');
}
