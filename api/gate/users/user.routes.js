const controller = require('./user.controller');

module.exports = Router => {
  const router = new Router({
    prefix: '/users',
  });

  router.use(async (ctx, next) => {
    if (ctx.state.user.account_type != 'admin') {
      ctx.throw(401);
    }
    await next();
  });

  router
    .get('/:id', controller.get)
    .get('/', controller.index)
    .post('/', controller.create)
    .put('/', controller.update)
    .del('/:id', controller.del);

  return router;
};
