var db = require('../../config/database');
var cleaners = require('../services/dataCleaners');
var User = require('./user');

const languages = ['java', 'javascript', 'python', 'ruby'];
const programming_experiences = {
  1: 'beginner',
  2: 'limited projects',
  3: 'multiple projects'
}


function teamsWithMembers() {
  var teams;

  return findAll()
  .then((res) => {
    teams = res;
    return User.findAll();
  })
  .then((users) => {
    return teams.map(function(team) {
      var teamMembers = users.filter(function(user) {
        return user.team_id === team.id;
      });
      team.users = teamMembers;
      return team;
    })
  })
}

function findAll() {
  return db.select().from('teams').orderBy('name');
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
  findAll,
  findOne,
  create,
  update,
  deleteOne,
  languages,
  programming_experiences,
  teamsWithMembers
}
