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
    'slack_username',
    'programming_experience',
    'languages',
    'location',
    'goals',
    'admin',
    'mentor',
    'pending',
    'created_at',
    'team_id',
    'mentor_topics'
  ]
  return db.first(fields)
    .from('users').where('id', id);
}

function findAll() {
  return db.select('name', 'id', 'mentor', 'programming_experience', 'mentor_topics', 'team_id').from('users').orderBy('name');
}

function findAllByType(bool) {
  return db.select('name', 'id').from('users').where('mentor', bool).orderBy('name');
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
    if(data[field]) {
      data[field] = cleaners.convertStringToBoolean(data[field]);
    }
  })

  if(!cleaners.validDate(data.created_at)) {
      data.created_at  = null;
  }

  return db.from('users').insert(data);
}

function update(id, data) {
  data = cleaners.trimPayload(data);

  ['admin', 'mentor', 'pending'].forEach( function(field) {
    if(data[field]) {
      data[field] = cleaners.convertStringToBoolean(data[field]);
    }
  })

  if(!cleaners.validDate(data.created_at)) {
    data.created_at  = null;
  } else {
    data.created_at = new Date(data.created_at)
  }

  return db.from('users')
  .update(data)
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
  findAllByType,
}
