'use strict';

const controller = require('./images.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/images`,
  });

  router
    .get('/:id', controller.get)
    .get('/', controller.index)
    .put('/', controller.update)
    .post('/', controller.create);

  return router;
};
