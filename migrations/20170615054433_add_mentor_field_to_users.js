exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.boolean('mentor');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('mentor');
  });
};
