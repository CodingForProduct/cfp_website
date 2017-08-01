var db = require('../../config/database');

function create(data) {
  return db.from('course_feedbacks').insert(data);
}

function findByWeek(week) {
  return db.from('course_feedbacks').where({week: week, public: true});
}

module.exports  = { create, findByWeek };
