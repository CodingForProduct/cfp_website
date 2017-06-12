var db = require('../config/database');
var authService = require('../config/auth');
var markdownService = require('./markdownService');

module.exports = function(app) {
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

  app.get('/users', authService.auth.connect(authService.basic), (request, response) => {
    db.select().from('users')
    .then(res => {
      response.render('users', { users: res });
    })
  });

  app.get('/users/:id', authService.auth.connect(authService.basic), (request, response) => {
    db.select().from('users').where('id', request.params.id)
    .then(res => {
      response.render('user', { user: res[0] });
    })
  });
  app.get('/setPassword', isLoggedOut, function(request, response) {
    response.render('set_password', { message: request.flash('setPassword'), currentUser: null });
  });
  app.get('/login', isLoggedOut, function(request, response) {
    response.render('login', { message: request.flash('loginMessage'), currentUser: null });
  });
function isLoggedOut(req, res, next) {
  // if user is not  authenticated in the session, carry on
  if (!req.isAuthenticated()) { return next(); }
  // if they are, redirect them
  res.redirect('/');
}
