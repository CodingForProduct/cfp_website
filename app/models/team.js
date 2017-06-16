var db = require('../../config/database');
var cleaners = require('../services/dataCleaners');

const languages = ['java', 'javascript', 'python', 'ruby'];
const programming_experiences = {
  1: 'beginner',
  2: 'limited projects',
  3: 'multiple projects'
}


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

function findOne(id) {
  const fields = [
    'id',
    'name',
    'programming_experience',
    'languages',
  ]
  return db.first(fields)
    .from('teams').where('id', id);
}


function create(data) {
  data = cleaners.trimPayload(data);

  data.created_at = new Date();
  return db.from('teams').insert(data);
}

function update(id, data) {
  data = cleaners.trimPayload(data);

  return db.from('teams')
  .update({
    name: data.name,
    programming_experience: data.programming_experience,
    languages: data.languages,
  })
  .where('id', id)
}

function deleteOne(id) {
  return db.from('teams')
  .delete()
  .where('id', id)
}

module.exports = {
  assignments,
  findAll,
  findOne,
  create,
  update,
  deleteOne,
  languages,
  programming_experiences
}
