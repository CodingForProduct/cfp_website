var User = require('./models/user');
var Team = require('./models/team');
var _ = require('lodash');

function tempResource(payload) {
  var fields = Object.keys(payload);
  var resource = {};
  fields.forEach(field => resource[field] = payload[field]);
  console.log(resource)
  return resource;
}

module.exports = function(app, passport) {
  app.get('/admin', isAdmin, (request, response) => {
    response.redirect('/admin/users');
  })

  // users index
  app.get('/admin/users', isAdmin, (request, response) => {
    User.findAll()
    .then((users) => {
      response.render('admin/users', {
        currentUser: request.user ,
        layout: 'layouts/admin_layout',
        alerts: request.flash('users'),
        users
      })
    })
    .catch(err => console.log('User.findAll err:', err));
  })

  // form for new user
  app.get('/admin/users/new', isAdmin, (request, response) => {
    Team.findAll()
    .then((teams) => {
      response.render('admin/users/new', {
        currentUser: request.user ,
        layout: 'layouts/admin_layout',
        alerts: [],
        teams,
        user: {},
      })
    })
    .catch(err => console.log('Team.findAll err:', err));
  })


  // create new user
  app.post('/admin/users', isAdmin, (request, response) => {
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
        response.render('admin/users/new', {
          currentUser: request.user ,
          layout: 'layouts/admin_layout',
          alerts: errors.map(error => error.msg),
          teams,
          user: tempResource(request.body),
        })
      })
      .catch(err => console.log('Team.finddAll err:', err));
    } else {
      User.create(request.body)
      .then((res) => {
        request.flash('users', 'user created');
        response.redirect('/admin/users');
      })
      .catch(err => console.log('User.create err:', errr))
    }
  });

  // form for editing user
  app.get('/admin/users/:id/edit', (request, response) => {
    User.findOne(request.params.id)
    .then(user => {
      Team.findAll()
      .then(teams => {
        response.render('admin/users/edit', {
          currentUser: request.user,
          layout: 'layouts/admin_layout',
          alerts: [],
          user,
          teams,
        })
      })
    })
    .catch(err => console.log('User.findOne err:', err))
  })

  // edit user
  app.post('/admin/users/:id/edit', (request, response) => {
    User.update(request.params.id, request.body)
    .then(res => {
      User.findAll()
      .then(users => {
        response.render('admin/users', {
          currentUser: request.user,
          layout: 'layouts/admin_layout',
          alerts: ['User is updated'],
          users
        })
      })
      .catch(err => console.log('User.findAll err:', err))

    })
    .catch(err => console.log('User.edit err:', err))
  })

// delete user
app.post('/admin/users/:id/delete', (request, response) => {
  User.deleteOne(request.params.id)
  .then(res => {
    User.findAll()
    .then((users) => {
      response.render('admin/users', {
        currentUser: request.user ,
        layout: 'layouts/admin_layout',
        alerts: ['User deleted'],
        users
      })
    })
    .catch(err => console.log('User.findAll err:', err));
  })
  .catch(err => console.log('Team.deleteOne err:', err))
})


  // teams index
  app.get('/admin/teams', isAdmin, (request, response) => {
    Team.findAll()
    .then((teams) => {
      response.render('admin/teams', {
        currentUser: request.user ,
        layout: 'layouts/admin_layout',
        alerts: [],
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
      alerts: [],
      languages: Team.languages,
      programming_experiences: Team.programming_experiences,
      team: {},
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
        alerts: errors.map(error => error.msg),
        languages: Team.languages,
        programming_experiences: Team.programming_experiences,
        team: tempResource(request.body),
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
          alerts: [],
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
          alerts: 'Team is updated',
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
            alerts: 'Team is updated',
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
