var express = require('express');
var path = require('path');
var marked = require('marked');
var fs = require('fs');
var app = express();

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

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

app.listen(3000, () => {
  console.log('server started on port 3000');
});
