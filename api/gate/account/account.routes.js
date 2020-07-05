const controller = require('./account.controller');

module.exports = Router => {
  const router = new Router({
    prefix: '/account',
  });

  router.get('/', controller.get).put('/', controller.update);

  return router;
};
