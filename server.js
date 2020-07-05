const Koa = require('koa');
const protect = require('koa-protect');
const ratelimit = require('koa-ratelimit');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')();
const helmet = require('koa-helmet')();
const logger = require('koa-logger')();

const session = require('koa-session');
const passport = require('koa-passport');

const errorHandler = require('./middleware/error.middleware');
const applyApiMiddleware = require('./api');
const { isDevelopment } = require('./config');

const server = new Koa();

server.use(
  require('koa-body')({
    multipart: true,
    formidable: { keepExtensions: true },
  }),
);

server.keys = ['secret'];
server.use(session({}, server));

require('./lib/auth');

server.use(passport.initialize());
server.use(passport.session());

server.use(
  protect.koa.sqlInjection({
    body: true,
    loggerFunction: console.error,
  }),
);

server.use(
  protect.koa.xss({
    body: true,
    loggerFunction: console.error,
  }),
);

server.use(require('koa-static')(`${process.env.STORAGE_DIR}`))

const db = new Map();
server.use(
  ratelimit({
    driver: 'memory',
    db,
    duration: 60000,
    errorMessage: 'Sometimes You Just Have to Slow Down.',
    id: ctx => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total',
    },
    max: 100,
  }),
);

require('koa2-ctx-validator')(server);

/**
 * Add here only development middlewares
 */
if (isDevelopment) {
  server.use(logger);
}

/**
 * Pass to our server instance middlewares
 */
server
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser);

/**
 * Apply to our server the api router
 */
applyApiMiddleware(server);

module.exports = server;
