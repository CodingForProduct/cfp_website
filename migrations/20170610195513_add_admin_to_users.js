exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.boolean('admin');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('admin');
  });
};
