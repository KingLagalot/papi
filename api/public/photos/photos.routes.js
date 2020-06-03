
const controller = require('./photos.controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: '/photos',
  });

  router
    .get('/:id', controller.get);

  return router;
};
