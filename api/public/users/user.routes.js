const controller = require('./user.controller');

module.exports = Router => {
  const router = new Router({
    prefix: '/users',
  });

  router
    .get('/:id/photos', controller.photos)
    .get('/:id/portfolios', controller.portfolios)
    .get('/:id', controller.get);

  return router;
};
