'use strict';

const db_util = require('../../utils/db.util');
const db = require('../../lib/db')('portfolios');

const _portfolio = {
  title: null,
  description: null,
};

exports.get = async ctx => {
  const portfolio_id = ctx
    .checkQuery('id')
    .isInt()
    .toInt();

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const portfolio = await db.where({ id: portfolio_id }).first();
  ctx.assert(portfolio, 404, 'The requested portfolio does not exist');
  ctx.status = 200;
  ctx.body = portfolio;
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
  var admin = ctx
    .checkQuery('admin')
    .optional()
    .toBoolean();

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  // Use auth for user_id
  const user_id = 0;

  // If admin check for admin, then if true return all records
  var query;
  if (admin) {
    query = db;
  } else {
    query = db.where('author', '=', user_id);
  }

  if (page && !size) {
    size = 25;
  }

  var portfolio;
  if (page) {
    portfolio = db_util.paginate(query, page, size);
  } else {
    portfolio = await db.select();
  }

  ctx.status = 200;
  ctx.body = portfolio;
};

exports.update = async ctx => {
  const id = ctx
    .checkBody('id')
    .isInt()
    .toInt();
  var body = _portfolio;
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
  const portfolio = db.where('id', '=', id).update(body);
  ctx.status = 200;
  ctx.body = portfolio;
};

exports.addPhoto = async ctx => {
  const photo_id = ctx
    .checkBody('photo_id')
    .isInt()
    .toInt();
  const portfolio_id = ctx
    .checkBody('portfolio_id')
    .isInt()
    .toInt();
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  console.log('addphoto');
  // Add photo to portfolio
};
