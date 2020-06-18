
const db_util = require('../../../utils/db.util');
const Photo = require('../../../lib/models/photo.model');

exports.get = async (ctx) => {
  const photo_id = ctx.checkParams('id')
    .toInt().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const photo = await Photo.get({ id: photo_id, author_id: ctx.state.user.id });
  ctx.assert(photo, 404, 'The requested photo does not exist');
  ctx.status = 200;
  ctx.body = photo;
};

exports.index = async (ctx) => {
  const query = ctx.state.user.getPhotosQuery();

  const body = await db_util.paginate(query, ctx);
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  ctx.status = 200;
  ctx.body = body;
};

exports.create = async (ctx) => {
  const portfolio_id = ctx.checkBody('portfolio_id')
    .optional()
    .toInt().value;

  var photo = {};
  photo.author_id = ctx.state.user.id;
  photo.title = ctx.checkBody('title').value;
  photo.description = ctx.checkBody('description').optional().value;
  photo.copyright = ctx.checkBody('copyright').optional().value;
  photo.author_id = user_id;
  photo.photo_url = ctx.checkFile('file')
    .notEmpty()
    .copy('/')
    .delete();
  photo.focal_length = ctx.checkBody('focal_length')
    .optional()
    .toInt().value;
  photo.iso = ctx.checkBody('iso')
    .optional()
    .toInt().value;
  photo.lens = ctx.checkBody('lens').optional().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  // TODO use transaction
  const body = db.insert(photo);

  // If portfolio is specified, insert
  if (portfolio_id) {
    const pivot_db = require('../../lib/db')('portfolios_photos');
    pivot_db.insert({ portfolio_id, photo_id: body.id });
  }

  // END transaction

  ctx.status = 200;
  ctx.body = body;
};

exports.update = async (ctx) => {
  const id = ctx.checkParams('id')
    .toInt().value;
  var photo = {};
  photo.title = ctx.checkBody('title').value;
  photo.description = ctx.checkBody('description').optional().value;
  photo.copyright = ctx.checkBody('copyright').optional().value;
  photo.focal_length = ctx.checkBody('focal_length')
    .optional()
    .toInt().value;
  photo.iso = ctx.checkBody('iso')
    .optional()
    .toInt().value;
  photo.lens = ctx.checkBody('lens').optional().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  db_util.clean(photo);
  photo = Photo.update(id, photo);
  ctx.status = 200;
  ctx.body = photo;
};
