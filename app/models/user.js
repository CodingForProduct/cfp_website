var bcrypt   = require('bcrypt-nodejs');

var db = require('../../config/database');

function findOne(field, value) {
  return  db.first().from('users').where(field, value);
}

function findAll() {
  return db.select().from('users');
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

module.exports = {
  findOne,
  findAll,
  validPassword,
  setPassword,
}
