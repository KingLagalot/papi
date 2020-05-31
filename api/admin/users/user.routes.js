'use strict';

const controller = require('./user.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/users`,
  });

  router
    .get('/:id', controller.get)
    .get('/', controller.index)
    .put('/', controller.update);

  return router;
};
