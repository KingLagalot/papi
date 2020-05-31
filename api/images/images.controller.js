'use strict';

const db_util = require('../../utils/db.util');
const db = require('../../lib/db')('images');

const _image = {
  title: null,
  description: null,
  copyright: null,
  author: null,
  photo_url: null,
  focal_length: null,
  iso: null,
  lens: null,
  coordinates: null,
};

exports.get = async ctx => {
  const image_id = ctx
    .checkQuery('id')
    .isInt()
    .toInt();

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const image = await db.where({ id: image_id }).first();
  ctx.assert(image, 404, 'The requested image does not exist');
  ctx.status = 200;
  ctx.body = image;
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

  var image;
  if (page) {
    image = db_util.paginate(query, page, size);
  } else {
    image = await db.select();
  }

  ctx.status = 200;
  ctx.body = image;
};

exports.create = async ctx => {
  const user_id = 0;
  const portfolio_id = ctx
    .checkBody('portfolio_id')
    .optional()
    .isInt()
    .toInt();
  var image = _image;
  image.title = ctx.checkBody('title');
  image.description = ctx.checkBody('description').optional();
  image.copyright = ctx.checkBody('copyright').optional();
  image.author = user_id;
  image.photo_url = ctx
    .checkFile('file')
    .notEmpty()
    .copy('/')
    .delete();
  image.focal_length = ctx
    .checkBody('focal_length')
    .optional()
    .isInt()
    .toInt();
  image.iso = ctx
    .checkBody('iso')
    .optional()
    .isInt()
    .toInt();
  image.lens = ctx.checkBody('lens').optional();
  image.coordinates = ctx.checkBody('coordinates').optional();

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  // TODO use transaction
  var body = db.insert(image);

  // If portfolio is specified, insert
  if (portfolio_id) {
    const pivot_db = require('../../lib/db')('portfolios_images');
    pivot_db.insert({ portfolio_id: portfolio_id, image_id: body.id });
  }

  ctx.status = 200;
  ctx.body = body;
};

exports.update = async ctx => {
  const id = ctx
    .checkBody('id')
    .isInt()
    .toInt();
  var body = _image;
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
  const image = db.where('id', '=', id).update(body);
  ctx.status = 200;
  ctx.body = image;
};
