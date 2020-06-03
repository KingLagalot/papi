
const db_util = require('../../../utils/db.util');
const db = require('../../../lib/db')('users');

exports.get = async (ctx) => {
  const user_id = this.checkQuery('id')
    .isInt()
    .toInt();

  if (this.errors) {
    ctx.status = 400;
    ctx.body = this.errors;
    return;
  }

  const user = await db.where({ id: user_id }).first();
  ctx.assert(user, 404, 'The requested user does not exist');
  ctx.status = 200;
  ctx.body = user;
};

exports.update = async (ctx) => {
  const id = this.checkBody('id').isInt();
  const body = _user;
  body.first_name = this.checkBody('first_name').optional();
  body.last_name = this.checkBody('last_name').optional();
  body.email = this.checkBody('email')
    .optional()
    .isEmail();

  if (this.errors) {
    ctx.status = 400;
    ctx.body = this.errors;
    return;
  }

  db_util.clean(body);
  const user = await db.where('id', '=', id).update(body);
  ctx.status = 200;
  ctx.body = user;
};
