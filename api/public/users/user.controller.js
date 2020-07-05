
const db_util = require('../../../utils/db.util');
const User = require('../../../lib/models/user.model');

exports.get = async (ctx) => {
  const user_id = ctx.checkParams('id')
    .isUUID().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const user = await User.get({ id: user_id });
  ctx.assert(user, 404, 'The requested user does not exist');
  ctx.status = 200;
  ctx.body = user;
};

exports.photos = async (ctx) => {
  // Check for params
  const user_id = ctx.checkParams('id')
    .isUUID().value;

  const user = await User.get({ id: user_id });
  ctx.assert(user, 404, 'The requested user does not exist');

  const query = user.getPhotosQuery();
  const body = await db_util.paginate(query, ctx);

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  ctx.status = 200;
  ctx.body = body;
};

exports.portfolios = async (ctx) => {
  // Check for params
  const user_id = ctx.checkParams('id')
    .isUUID().value;

  const user = await User.get({ id: user_id });
  ctx.assert(user, 404, 'The requested user does not exist');

  const query = user.getPortfoliosQuery();
  const body = await db_util.paginate(query, ctx);

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  // END

  ctx.status = 200;
  ctx.body = body;
};
