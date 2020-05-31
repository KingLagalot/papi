'use strict';

const db_util = require('../../utils/db.util');
const db = require('../../lib/db')('users');

const _user = {
  first_name: null,
  last_name: null,
  email: null,
};

exports.get = async ctx => {
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

exports.index = async ctx => {
  const page = this.checkQuery('page')
    .optional()
    .toInt();
  var size = this.checkQuery('size')
    .optional()
    .toInt();

  if (this.errors) {
    ctx.status = 400;
    ctx.body = this.errors;
    return;
  }

  if (page && !size) {
    size = 25;
  }

  var query = db.select();
  var users;

  if (page) {
    users = db_util.paginate(query, page, size);
  } else {
    users = await query;
  }

  ctx.status = 200;
  ctx.body = users;
};

exports.update = async ctx => {
  const id = this.checkBody('id').isInt();
  var body = _user;
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
