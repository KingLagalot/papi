
const controller = require('./user.controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: '/users',
  });

  router
    .get('/:id', controller.get)
    .get('/', controller.index)
    .post('/', controller.create)
    .put('/', controller.update);

  return router;
};
