var jwt = require('jwt-simple');

exports.default = user_id => {
  return jwt.encode(
    {
      user_id: user_id,
      exp: Math.round(new Date().getTime() / 1000) + 3600 * 4,
    },
    process.env.SECRET,
  );
};
