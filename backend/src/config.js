const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 4000
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/backend'
  },
  admin_account: {
      firstName: 'Admin',
      lastName: '',
      email: 'admin@admin.nu',
      password: process.env.ADMIN_PASSWORD || '8fhsW-tqm',
      role: 'ADMIN',
  }
};

module.exports = config;
