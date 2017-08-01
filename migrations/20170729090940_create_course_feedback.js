
exports.up = function(knex, Promise) {
  return knex.schema.createTable('course_feedbacks', function (table) {
    table.increments();
    table.string('name');
    table.text('start');
    table.text('stop');
    table.text('continue');
    table.boolean('public');
    table.text('additional');
    table.integer('week');
    table.unique(['created_at', 'name'])
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('course_feedbacks');
};
