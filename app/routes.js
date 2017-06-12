var authService = require('../config/auth');
var markdownService = require('./markdownService');
var User = require('./models/user');

module.exports = function(app, passport) {
  app.get('/', (request, response) => {
    const file = markdownService.readFile('/views/markdown/home.md');
    response.send(markdownService.renderMarkdownFile(file));
  });

  app.get('/coding_exercise', (request, response) => {
    const file = markdownService.readFile('/views/markdown/coding_exercise.md');
    response.send(markdownService.renderMarkdownFile(file));
  });

  app.get('/workshop_summary', (request, response) => {
    const file = markdownService.readFile('/views/markdown/workshop_summary.md');
    response.send(markdownService.renderMarkdownFile(file));
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

  app.get('/setPassword', isLoggedOut, function(request, response) {
    response.render('set_password', { message: request.flash('setPassword'), currentUser: null });
  });
  app.get('/login', isLoggedOut, function(request, response) {
    response.render('login', { message: request.flash('loginMessage'), currentUser: null });
  });
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
