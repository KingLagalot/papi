
const db_util = require('../../../utils/db.util');
const db = require('../../../lib/db')('users');
const User = require('../../../lib/models/user.model');

exports.get = async (ctx) => {

  ctx.assert(ctx.state.user, 404, 'The requested user does not exist');
  ctx.body = ctx.state.user;
  ctx.status = 200;
};

exports.update = async (ctx) => {
  const body = {};
  body.first_name = ctx.checkBody('first_name').optional().value;
  body.last_name = ctx.checkBody('last_name').optional().value;
  body.email = ctx.checkBody('email')
    .optional()
    .isEmail().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  db_util.clean(body);
  const id = await User.update(ctx.state.user.id, body);
  ctx.status = 200;
  ctx.body = id;
  return;
};
