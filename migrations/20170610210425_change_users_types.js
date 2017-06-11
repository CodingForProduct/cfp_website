
exports.up = function(knex, Promise) {
  return knex.raw('alter TABLE users ALTER COLUMN goals TYPE text').then(() => {
    return knex.raw('alter TABLE users ALTER COLUMN programming_experience TYPE text');
  });

};

exports.down = function(knex, Promise) {
  return knex.raw('alter TABLE users ALTER COLUMN goals TYPE character varying(255)').then(() => {
    return knex.raw('alter TABLE users ALTER COLUMN programming_experience TYPE character varying(255)');
  });
};


