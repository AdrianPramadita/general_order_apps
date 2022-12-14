const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "order_online",
      user: "postgres",
      password: 'setiabudi5',
      host: "localhost",
    },
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "order_online",
      user: "postgres",
      password: 'setiabudi5',
      host: "localhost",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: "order_online",
      user: "postgres",
      password: 'setiabudi5',
      host: "localhost",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};


