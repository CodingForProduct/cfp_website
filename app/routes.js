var db = require('../config/database');
var authService = require('../config/auth');
var markdownService = require('./markdownService');

module.exports = function(app) {
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
}
