module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://postgres@localhost/euphoria',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://postgres@localhost/euphoria-test',
    CLIENT_ORIGIN: '*'
  }