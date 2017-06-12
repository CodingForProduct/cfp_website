exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.boolean('admin');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('admin');
    table.dropColumn('password');
  });
};
