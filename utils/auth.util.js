exports.admin = (ctx, next) => {
  // Check if admin.
  next();
  // else return error
  ctx.status = 403;
  ctx.body = JSON.stringify({
    error: 'unauthorized',
  });
};
