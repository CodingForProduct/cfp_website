var db = require('../../config/database');

function assignments() {
  const sql = `select teams.name as team_name, users.id as user_id, users.name as user_name, teams.id as team_id, users.programming_experience, users.goals
  from teams
  join users
  on users.team_id = teams.id
  order by teams.name`;
  return db.raw(sql);
}

function findAll() {
  return db.select('name', 'id').from('teams').orderBy('name');
}

module.exports = {
  assignments,
  findAll
}
