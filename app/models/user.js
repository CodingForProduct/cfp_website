var bcrypt   = require('bcrypt-nodejs');

var db = require('../../config/database');

function findOneWithPassword(field, value) {
  return  db.first().from('users').where(field, value);
}

function findOne(field, value) {
  const fields = [
    'name',
    'github_username',
    'programming_experience',
    'languages',
    'location',
    'goals',
    'admin',
    'mentor',
    'pending'
  ]
  return db.first(fields)
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

function convertStringToBoolean(text) {
  return text === 'true';
}

function validDate(dateString) {
  // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
  var tempDate =  new Date(dateString);
  return !isNaN(tempDate.getTime())
}

function create(data) {
  ['admin', 'mentor', 'pending'].forEach( function(field) {
    data[field] = convertStringToBoolean(data[field]);
  })

  if(!validDate(data.created_at)) {
      data.created_at  = null;
  }

  return db.from('users').insert(data);
}

module.exports = {
  findOne,
  findAll,
  create,
  validPassword,
  setPassword,
  findOneWithPassword,
}
