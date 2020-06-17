
const fs = require('fs');
const path = require('path');
const passport = require('koa-passport');

const baseName = path.basename(__filename);

module.exports = (Router) => {
  const router = new Router({
    prefix: '/gate',
  });

  router.use(async (ctx) => {
  await new Promise((resolve, reject) => {
    passport.authenticate('authtoken', { session: false, optional: false}, (err, user, info, status) => {
      if (user) {
        ctx.login(user);
        ctx.status = 200;
        ctx.user = user;
        resolve();
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
        reject();
      }
    })(ctx);
  });
  })

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== baseName)
    .forEach((file) => {
      const api = require(path.join(__dirname, file))(Router);
      router.use(api.routes());
    });

  return router;
};
