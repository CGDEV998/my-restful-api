'use-strict';

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/cayenne_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    },
    pool: { 
      min: 0, 
      max: 1
    }
  },
  development: {
    client: 'pg',
    debug: true,
    connection: 'postgres://localhost/cayenne',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    },
    pool: { 
      min: 0, 
      max: 1
    }
  },
  common: {
    client: 'pg',
    connection: 'postgres://localhost/cayenne',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/common'
    },
    pool: { 
      min: 0, 
      max: 1
    }
  },
  production: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_PINK_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    },
    pool: { 
      min: 0, 
      max: 1
    }
  }
};
