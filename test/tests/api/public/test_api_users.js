const request = require('supertest');
const assert = require('assert');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route(
  '/public/users',
);
const user_factory = require('../../../factories/user.factory');
const User = require('../../../../lib/models/user.model');

require('should');

describe('API /public/users', function() {
  let server;
  let user;

  beforeEach(async function() {
    server = app.listen();
    user = await user_factory.user(true);
  });
  afterEach(async function() {
    server.close();
  });

  // Gets user by id
  it('get /:id', async function() {
    return request(server)
      .get(`${route}/${user.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert(response.body.id, user.id);
        assert(!response.body.password);
      });
  });

  // Gets user that doesn't exist
  it('get /:id - wrong id', async function() {
    return request(server)
      .get(`${route}/00000000-0000-0000-0000-000000000000`)
      .expect(404);
  });

  // Gets public images of user
  it('index /:id/photos', async function() {
    return request(server)
      .get(`${route}/${user.id}/photos`)
      .expect(200);
  });

  // Gets public portfolios of user
  it('index /:id/portfolios', async function() {
    return request(server)
      .get(`${route}/${user.id}/portfolios`)
      .expect(200);
  });
});
