exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', function (table) {
    table.increments();
    table.string('name');
    table.string('programming_experience');
    table.string('languages');
    table.timestamps();
  }).then(() => {
    return knex.schema.table('users', function(table){
      table.integer('team_id').unsigned().index()
         .references('teams.id').onDelete('CASCADE');
    })
  });
};

exports.down = function(knex, Promise) {
  return  knex.schema.table('users', function(table) {
    table.dropColumn('team_id');
  }).then(() => {
    return knex.schema.dropTable('teams');
  })
};
