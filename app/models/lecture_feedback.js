var db = require('../../config/database');

function create(data) {
  return db.from('lecture_feedbacks').insert(data);
}

function findByWeek(week) {
  return db.from('lecture_feedbacks').where({week: week, public: true});
}

module.exports  = { create, findByWeek };
