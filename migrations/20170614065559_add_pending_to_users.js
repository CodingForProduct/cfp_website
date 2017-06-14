exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.boolean('pending');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('pending');
  });
};
