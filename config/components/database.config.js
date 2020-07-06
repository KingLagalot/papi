const config = {
  databaseConfig: {
    user: envVars.DB_USER,
    host: envVars.DB_HOST,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    port: envVars.DB_PORT,
  },
};

module.exports = config;
