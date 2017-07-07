
exports.up = function(knex, Promise) {
  return knex.schema.table('teams', function(table){
    table.string('repo_url');
  })
};

exports.down = function(knex, Promise) {
   return knex.schema.table('teams', function(table){
    table.string('repo_url');
  })
};
