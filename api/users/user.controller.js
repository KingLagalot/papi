'use strict';

const generateId = require('../../utils/generateId.util');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = require('../../lib/db')('users');

exports.get = ctx => {
  const userId = this.checkQuery('id')
    .isInt()
    .toInt();

  if (this.errors) {
    this.body = this.errors;
    return;
  }

  const user = db.where({ id: userId }).first();
  ctx.assert(user, 404, 'The requested user does not exist');
  ctx.status = 200;
  ctx.body = user;
};

exports.index = async ctx => {
  const page = this.checkQuery('page')
    .optional()
    .toInt();
  var size = this.checkQuery('size')
    .optional()
    .toInt();

  if (page && !size) {
    size = 25;
  }

  var users;
  if (page) {
    var body = {};
    const offset = (page - 1) * size;
    return Promise.all([
      db.count('* as count').first(),
      db
        .select('*')
        .offset(offset)
        .limit(size),
    ]).then(([total, rows]) => {
      var count = total.count;
      body.total = count;
      body.per_page = size;
      body.offset = offset;
      body.to = offset + rows.length;
      body.last_page = Math.ceil(count / size);
      body.current_page = page;
      body.from = offset;
      body.data = rows;
      users = body;
    });
  } else {
    users = db.select();
  }

  ctx.status = 200;
  ctx.body = users;
};

exports.update = async ctx => {
  const { name } = ctx.request.body;
  ctx.assert(name, 400, 'The user info is malformed!');
  const id = generateId();
  const newUser = {
    id,
    name,
    timestamp: Date.now(),
  };
  db.users.push(newUser);
  const createdUser = db.users.find(user => user.id === id);
  ctx.status = 201;
  ctx.body = createdUser;
};
