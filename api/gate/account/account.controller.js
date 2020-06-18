
const db_util = require('../../../utils/db.util');
const db = require('../../../lib/db')('users');

exports.get = (ctx, done) => {

  ctx.assert(ctx.user, 404, 'The requested user does not exist');
  ctx.body = ctx.user;
  ctx.status = 200;
  done();
};

exports.update = async (ctx) => {
  const body = {};
  body.first_name = ctx.checkBody('first_name').optional();
  body.last_name = ctx.checkBody('last_name').optional();
  body.email = ctx.checkBody('email')
    .optional()
    .isEmail();

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  db_util.clean(body);
  const user = await db.where('id', '=', ctx.user.id).update(body);
  ctx.status = 200;
  ctx.body = user;
};
