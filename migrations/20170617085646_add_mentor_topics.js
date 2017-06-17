exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.string('mentor_topics');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('mentor_topics');
  });
};
