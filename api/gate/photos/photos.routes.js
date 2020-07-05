
const controller = require('./photos.controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: '/photos',
  });

  router
    .get('/:id', controller.get)
    .get('/', controller.index)
    .put('/:id', controller.update)
    .post('/', controller.create)
    .del('/:id', controller.del);

  return router;
};
