var db = require('../../config/database');

function create(data) {
  return db.from('lecture_feedbacks').insert(data);
}

module.exports  = { create };
