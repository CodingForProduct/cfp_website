var db = require('../../config/database');

function create(data) {
  return db.from('tech_careers').insert(data);
}

module.exports  = { create };
