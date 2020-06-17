
const http = require('http');
const server = require('./server');
const db = require('./lib/db');
require('dotenv').config()

const { port } = require('./config').server;

async function bootstrap() {
  /**
   * Add external services init as async operations (db, redis, etc...)
   * e.g.
   * await sequelize.authenticate()
   */

  try {
    await db.select(db.raw('1'));
  } catch (err) {
    process.exitCode = 1;
  } finally {
    if (server) {
      await server.stop();
    }
    await db.destroy();

    setTimeout(() => process.exit(), 10000).unref();
  }
  return http.createServer(server.callback()).listen(port);
}

bootstrap()
  .then((server) => console.log(`🚀 Server listening on port ${server.address().port}!`))
  .catch((err) => {
    setImmediate(() => {
      console.error('Unable to run the server because of the following error:');
      console.error(err);
      process.exit();
    });
  });
