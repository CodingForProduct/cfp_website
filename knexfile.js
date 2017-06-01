require('./config/environment');

const pgDefaults = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 0,
    max: 2,
  },
  migrations: {
    directory: __dirname + '/migrations',
    tableName: 'migrations'
  },
};

module.exports = {
  development: pgDefaults,
  staging: pgDefaults,
  production: pgDefaults
};
