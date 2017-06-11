var express = require('express');
var path = require('path');

// express
var app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set the folder for  static assets
app.use(express.static(path.join(__dirname, 'public')));

// routes
require('./app/routes')(app);

app.listen(process.env.PORT, () => {
  console.log('server started on port ' + process.env.PORT);
});
