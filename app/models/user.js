var bcrypt   = require('bcrypt-nodejs');

var db = require('../../config/database');

function findOneWithPassword(field, value) {
  return  db.first().from('users').where(field, value);
}

function findOne(field, value) {
  return db.first('name', 'github_username', 'programming_experience', 'languages', 'location', 'goals')
    .from('users').where(field, value);
}

function findAll() {
  return db.select('name', 'id').from('users');
}

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(text, hashPassword) {
  if(!hashPassword) { return false; }
  return bcrypt.compareSync(text, hashPassword);
};

function setPassword(email, password) {
  const user =  db.first().from('users')
    .where('email', email)
    .whereNull('password');

  if(!user) { return };

  return user.update({ password: generateHash(password) })
}

function create(data) {
  if(data.name && data.email && data.github_username && data.programming_experience && data.languages && data.location && data.goals) {
    return db.from('users').insert(data);
  } else {
    return Promise.resolve(false);
  }
}

module.exports = {
  findOne,
  findAll,
  create,
  validPassword,
  setPassword,
  findOneWithPassword,
}
