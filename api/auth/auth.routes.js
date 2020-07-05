const controller = require('./auth.controller');

module.exports = Router => {
  const router = new Router({
    prefix: '/auth',
  });

  router
    .post('/register', controller.register)
    .post('/login', controller.login)
    .post('/logout', controller.logout);

  return router;
};
