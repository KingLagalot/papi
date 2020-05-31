'use strict';

const db_util = require('../../utils/db.util');
const db = require('../../lib/db')('users');

const _user = {
  first_name: null,
  last_name: null,
  email: null,
};

exports.get = async ctx => {
  const user_id = ctx
    .checkQuery('id')
    .isInt()
    .toInt();

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const user = await db.where({ id: user_id }).first();
  ctx.assert(user, 404, 'The requested user does not exist');
  ctx.status = 200;
  ctx.body = user;
};

exports.index = async ctx => {
  const page = ctx
    .checkQuery('page')
    .optional()
    .toInt();
  var size = ctx
    .checkQuery('size')
    .optional()
    .toInt();

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
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
  const id = ctx.checkBody('id').isInt();
  var body = _user;
  body.first_name = ctx.checkBody('first_name').optional();
  body.last_name = ctx.checkBody('last_name').optional();
  body.email = ctx
    .checkBody('email')
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
