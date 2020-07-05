
const db_util = require('../../../utils/db.util');
const db = require('../../../lib/db')('users');
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

exports.index = async (ctx) => {
  const query = db.select();
  users = await db_util.paginate(query, ctx);

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  ctx.status = 200;
  ctx.body = users;
};

exports.create = async (ctx) => {
  const id = ctx.checkBody('id')
    .isUUID().value;
  const body = _user;
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
  const user = await db.where('id', '=', id).update(body);
  ctx.status = 200;
  ctx.body = user;
};

exports.update = async (ctx) => {
  const id = ctx.checkBody('id')
    .isUUID().value;
  const body = _user;
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
  const user = await db.where('id', '=', id).update(body);
  ctx.status = 200;
  ctx.body = user;
};

exports.del = async (ctx) => {
  const id = ctx.checkParams('id')
    .isUUID().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const ret = await User.remove(id);
  if(ret != 1){
    return
  }
  ctx.status = 204;
};