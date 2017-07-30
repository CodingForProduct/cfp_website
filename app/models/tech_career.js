var db = require('../../config/database');

function create(data) {
  return db.from('tech_careers').insert(data);
}

function findAll(whereQuery) {
  var query = db.select().from('tech_careers').orderBy('id');
  if(whereQuery) {
    console.log('whereQuery', whereQuery)
    query.where(whereQuery)
  }
  return query
}

function findOne(id) {
  return db.first().from('tech_careers').where('id', id);
}


module.exports  = { create, findAll, findOne };
