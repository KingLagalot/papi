const config = {
  env: process.env.NODE_ENV,
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  server: {
    port: process.env.PORT || 3000,
    apiVersion: `v${process.env.API_VERSION}` || 'v1',
  },
};

module.exports = config;
