var marked = require('marked');
var path = require("path");
var fs = require('fs');

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

const readFile = (partialPath) => {
  var filePath = path.join(__dirname, '..', partialPath);
  return fs.readFileSync(filePath, 'utf8');
}

const renderMarkdownFile = (file) => {
  const header = readFile('/views/partials/header.ejs');
  const footer = readFile('/views/partials/footer.ejs');
  return header + marked(file.toString()) + footer;
}

module.exports = {
  marked, readFile, renderMarkdownFile
}
