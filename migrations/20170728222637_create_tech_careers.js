
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tech_careers', function (table) {
    table.increments();
    table.string('name');
    table.string('job_title');
    table.text('your_start');
    table.text('your_job');
    table.text('advice');
    table.boolean('public');
    table.string('contact');
    table.unique(['created_at', 'name', 'job_title'])
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tech_careers');
};
