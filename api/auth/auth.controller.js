
const passport = require('koa-passport');
const User = require('../../lib/models/user.model');
var jwt = require('jwt-simple');

exports.register = async (ctx) => {
  const username = ctx.checkBody('username').value;
  const email = ctx.checkBody('email').value;
  const password = ctx.checkBody('password').value;


  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  // Need to implement email validation

  try {
    const user = await User.create({ username, email, password });

    ctx.login(user);
    ctx.status = 201;
    ctx.body = user;
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (ctx) => {
  ctx.checkBody('username');
  ctx.checkBody('password');

  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = ctx.errors;
    return;
  }

  await new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.login(user);
        ctx.status = 200;
        // 4 hours til expiration
        const token = jwt.encode({user_id: user.id, exp: Math.round(new Date().getTime() / 1000) + (3600 * 4)}, process.env.SECRET)
        ctx.body = {token: token};
        resolve();
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
        reject();
      }
    })(ctx);
  });
};

exports.logout = async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.status = 204;
    ctx.body = { success: true };
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
};
