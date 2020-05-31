exports.admin = (ctx, next) => {
  // else return error
  ctx.status = 403;
  ctx.body = JSON.stringify({
    error: 'unauthorized',
  });
};
