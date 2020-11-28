require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "ssl": process.env.SSL,
  // "host": process.env.MIGRATION_DB_HOST,
  // "port": process.env.MIGRATION_DB_PORT,
  // "database": process.env.MIGRATION_DB_NAME,
  // "username": process.env.MIGRATION_DB_USER,
  "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DB_URL
    : process.env.DB_URL,
}