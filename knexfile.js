// Update with your config settings.
const mysql_endpoint = "parkhog-db.cnumdaywuucj.us-east-1.rds.amazonaws.com";

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host: mysql_endpoint,
        user: 'jstaff',
        password: 'Alba!#78',
        database: 'parkhog',
        port:     '3306'     
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: mysql_endpoint,
      user: 'jstaff',
      password: 'Alba!#78',
      database: 'parkhog',
      port:     '3306'     
  },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: mysql_endpoint,
      user: 'jstaff',
      password: 'Alba!#78',
      database: 'parkhog',
      port:     '3306'     
  },
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
