const db = require('../../../lib/db')('photos');

exports.get = async ctx => {
  const photo_id = ctx.checkParams('id').isUUID().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const photo = await db.where({ id: photo_id }).first();
  ctx.assert(photo, 404, 'The requested photo does not exist');
  ctx.status = 200;
  ctx.body = photo;
};
