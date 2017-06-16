var bcrypt   = require('bcrypt-nodejs');

var db = require('../../config/database');
var cleaners = require('../services/dataCleaners');

function findOneWithPassword(field, value) {
  return  db.first().from('users').where(field, value);
}

function findOne(id) {
  const fields = [
    'id',
    'name',
    'email',
    'github_username',
    'programming_experience',
    'languages',
    'location',
    'goals',
    'admin',
    'mentor',
    'pending',
    'created_at',
    'team_id'
  ]
  return db.first(fields)
    .from('users').where('id', id);
}

function findAll() {
  return db.select('name', 'id').from('users').orderBy('name');
}

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(text, hashPassword) {
  if(!hashPassword) { return false; }
  return bcrypt.compareSync(text, hashPassword);
};

function setPassword(email, password) {
  const user = db.first().from('users')
    .where('email', email)
    .whereNull('password');

    return user
    .then(res => {
      if (res) {
        return user.update({ password: generateHash(password) });
      } else {
        return;
      }
    });
}


function create(data) {
  data = cleaners.trimPayload(data);

  ['admin', 'mentor', 'pending'].forEach( function(field) {
    data[field] = cleaners.convertStringToBoolean(data[field]);
  })

  if(!cleaners.validDate(data.created_at)) {
      data.created_at  = null;
  }

  return db.from('users').insert(data);
}

function update(id, data) {
  data = cleaners.trimPayload(data);

  return db.from('users')
  .update({
    name: data.name,
    email: data.email,
    github_username: data.github_username,
    programming_experience: data.programming_experience,
    languages: data.languages,
    location: data.location,
    goals: data.goals,
    admin: cleaners.convertStringToBoolean(data.admin),
    pending: cleaners.convertStringToBoolean(data.pending),
    mentor: cleaners.convertStringToBoolean(data.mentor),
    team_id: data.team_id,
  })
  .where('id', id)
}

function deleteOne(id) {
  return db.from('users')
  .delete()
  .where('id', id)
}

module.exports = {
  findOne,
  findAll,
  create,
  update,
  deleteOne,
  validPassword,
  setPassword,
  findOneWithPassword,
}
