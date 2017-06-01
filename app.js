var express = require('express');
var path = require('path');
var marked = require('marked');
var fs = require('fs');

// auth
var auth = require('http-auth');
var basic = auth.basic({
    realm: "Coding For Product Area.",
    file: __dirname + "/data/users.htpasswd"
});

// dotenv
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

// markdown
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

var app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set the folder for  static assets
app.use(express.static(path.join(__dirname, 'public')));

const readFile = (path) => {
  var filePath = __dirname + path;
  return fs.readFileSync(filePath, 'utf8');
}

const renderMarkdownFile = (file) => {
  const header = readFile('/views/partials/header.ejs');
  const footer = readFile('/views/partials/footer.ejs');
  return header + marked(file.toString()) + footer;
}

// routes
app.get('/', (request, response) => {
  const file = readFile('/views/markdown/home.md');
  response.send(renderMarkdownFile(file));
});


app.get('/coding_exercise', (request, response) => {
  const file = readFile('/views/markdown/coding_exercise.md');
  response.send(renderMarkdownFile(file));
});

app.get('/workshop_summary', (request, response) => {
  const file = readFile('/views/markdown/workshop_summary.md');
  response.send(renderMarkdownFile(file));
});

app.get('/users', auth.connect(basic), (request, response) => {
  response.send('hi');
});

app.listen(process.env.PORT, () => {
  console.log('server started on port ' + process.env.PORT);
});
