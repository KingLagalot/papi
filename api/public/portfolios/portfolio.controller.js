const db = require('../../../lib/db')('portfolios');

exports.get = async ctx => {
  const portfolio_id = ctx.checkParams('id').isUUID().value;

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
