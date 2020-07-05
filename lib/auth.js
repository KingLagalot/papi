const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthTokenStrategy = require('passport-auth-token').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
var jwt = require('jwt-simple');
const knex = require('./db');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) =>
  knex('users')
    .where({ id })
    .first()
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    }),
);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.get({ username }, ['password'])
      .then(user => {
        if (!user) return done(null, false);
        if (comparePass(password, user.password)) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        console.error(err);
        return done(err);
      });
  }),
);

passport.use(
  'authtoken',
  new AuthTokenStrategy({ headerFields: ['token'] }, function(token, done) {
    var decoded = jwt.decode(token, process.env.SECRET);
    try {
      if (decoded['user_id'] && decoded['exp']) {
        var now = Math.round(new Date().getTime() / 1000);
        if (parseInt(decoded['exp']) > now) {
          User.get({ id: decoded['user_id'] }).then(user => {
            if (!user) {
              return done(null, false);
            }
            return done(null, user);
          });
        } else {
          throw 'Token has expired.';
        }
      }
    } catch (e) {
      return done(e);
    }
    /*
    AuthToken.get({token: token}).then((access_token) => {
      if (access_token) {
        if (!token.isValid(accessToken)) {
          return done(null, false);
        }

        User.findOne({
          id: accessToken.userId,
        }, (_error, user) => {
          if (_error) {
            return done(_error);
          }

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        });
      } else {
        return done(null);
      }
    }).catch(err => {
      done(err);
    });
    */
  }),
);
