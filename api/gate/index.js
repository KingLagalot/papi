
const fs = require('fs');
const path = require('path');
const auth_util = require('../../utils/auth.util');

const baseName = path.basename(__filename);

module.exports = (Router) => {
  const router = new Router({
    prefix: '/gate',
  });

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== baseName)
    .forEach((file) => {
      const api = require(path.join(__dirname, file))(Router);
      router.use(api.routes(), auth_util.admin);
    });

  return router;
};
