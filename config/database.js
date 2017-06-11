var knexConfig = require('../knexfile');
var db = require('knex')(knexConfig[process.env.NODE_ENV]);

module.exports = db;
