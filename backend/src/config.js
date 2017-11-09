const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 4000
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/backend'
  }
};

module.exports = config;
