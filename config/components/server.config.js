const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT || 3000,
    apiVersion: `v${envVars.API_VERSION}` || 'v1',
  },
};

module.exports = config;
