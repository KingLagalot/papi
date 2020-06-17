
const db_util = require('../../../utils/db.util');
const Photo = require('../../../lib/models/photo.model');

exports.get = async (ctx) => {
  // Auth get user id
  const user = null;
  const photo_id = ctx.checkQuery('id')
    .toInt().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const photo = await Photo.get({ id: photo_id, author_id: user.id });
  ctx.assert(photo, 404, 'The requested photo does not exist');
  ctx.status = 200;
  ctx.body = photo;
};

exports.index = async (ctx) => {
  // Auth get user id
  const user = null;

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

exports.create = async (ctx) => {
  const portfolio_id = ctx.checkBody('portfolio_id')
    .optional()
    .toInt().value;

  const photo = _photo;
  photo.author_id = ctx.state.user.id;
  photo.title = ctx.checkBody('title');
  photo.description = ctx.checkBody('description').optional();
  photo.copyright = ctx.checkBody('copyright').optional();
  photo.author = user_id;
  photo.photo_url = ctx.checkFile('file')
    .notEmpty()
    .copy('/')
    .delete();
  photo.focal_length = ctx.checkBody('focal_length')
    .optional()
    .toInt();
  photo.iso = ctx.checkBody('iso')
    .optional()
    .toInt();
  photo.lens = ctx.checkBody('lens').optional();
  photo.coordinates = ctx.checkBody('coordinates').optional();

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
  const id = ctx.checkBody('id')
    .toInt().value;
  const body = _photo;
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
  const photo = db.where('id', '=', id).update(body);
  ctx.status = 200;
  ctx.body = photo;
};
