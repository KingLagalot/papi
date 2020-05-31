'use strict';

const controller = require('./portfolio.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/portfolios`,
  });

  router
    .get('/:id', controller.get)
    .get('/', controller.index)
    .put('/', controller.update)

  return router;
};
