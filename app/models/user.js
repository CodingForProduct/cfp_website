var db = require('../config/database');

function findOne(field, value) {
  return  db.first().from('users').where(field, value);
}

function findAll() {
  return db.select().from('users');
}

module.exports = {
  findOne,
  findAll,
}
