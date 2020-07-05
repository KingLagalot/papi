
const fs = require('fs');
const path = require('path');
const passport = require('koa-passport');

const baseName = path.basename(__filename);

module.exports = (Router) => {
  const router = new Router({
    prefix: '/gate',
  });

  router.use(async (ctx, next) => {
    await passport.authenticate('authtoken', { session: false, optional: false}, (err, user, info, status) => {
      if (user) {
        ctx.login(user);
      } else {
        ctx.throw(401)
      }
    })(ctx);
    await next();
  });

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== baseName)
    .forEach((file) => {
      const api = require(path.join(__dirname, file))(Router);
      router.use(api.routes());
    });

  return router;
};
