module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://xyfoxqojvyzcrv:5a07f1cdf99dc1971b9fb563ef51144c2ea970ef0338646d8bf211d1181fc1a2@ec2-34-237-236-32.compute-1.amazonaws.com:5432/d8ttk2trn0tvp4',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/euphoria-test',
    CLIENT_ORIGIN: '*'
  }