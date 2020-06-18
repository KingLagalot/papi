
const db_util = require('../../../utils/db.util');
const db = require('../../../lib/db')('portfolios');
const Portfolio = require('../../../lib/models/portfolio.model');

exports.get = async (ctx) => {
  const portfolio_id = ctx.checkQuery('id')
    .toInt().value;

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  const portfolio = await Portfolio.get({ id: portfolio_id, author_id: ctx.user.id });
  ctx.assert(portfolio, 404, 'The requested portfolio does not exist');
  ctx.status = 200;
  ctx.body = portfolio;
};

exports.index = async (ctx) => {
  const query = ctx.user.getPortfoliosQuery();

  const body = await db_util.paginate(query, ctx);

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  ctx.status = 200;
  ctx.body = body;
};

exports.update = async (ctx) => {
  const id = ctx.checkQuery('id')
    .toInt().value;
  const body = {};
  body.title = ctx.checkBody('title').optional().value;
  body.description = ctx.checkBody('description').optional().value;
  body.public = ctx.checkBody('public').optional().isBool().value;

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

exports.create = async (ctx) => {
  const body = {};
  body.title = ctx.checkBody('title').optional().value;
  body.description = ctx.checkBody('description').optional().value;
  body.public = ctx.checkBody('public').optional().isBool().value;
  body.author_id = ctx.user.id;
  var portf = Portfolio.create(body);

  ctx.body = portf;
  ctx.status = 200;
};

exports.addPhotos = async (ctx) => {
  const photos = ctx.checkBody('photos').value;
  if(!Array.isArray(photos)){
    ctx.addError('photos must be an array of ids');
  }
  const portfolio_id = ctx.checkQuery('id')
    .toInt().value;
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }
  const pf = await Portfolio.get({id: portfolio_id});
  photos.forEach(async photo_id => {
    await pf.addPhoto(photo_id);
  });
  ctx.body = pf.withPhotos();
  ctx.status = 200;
};
