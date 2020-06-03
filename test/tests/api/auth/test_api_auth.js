
const request = require('supertest');
const assert = require('assert');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/auth');
const user_factory = require('../../../factories/user.factory');

require('should');

describe('API /auth', function () {
  let server;

  // Setup and teardown functions
  this.beforeEach(async () => {
    server = app.listen();
  });
  afterEach(async function() {
    // Need to close server else mocha will hang open
    server.close();
  });

  it('post /register', async () => {
    const user = await user_factory.default(false);
    await request(server)
      .post(`${route}/register`)
      .send({
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .expect(201)
      .then((resp) => {
        console.log(resp);
      });
  });
  it('post /login', async () => {
    const user = await user_factory.default(true, {}, ['password']);
    await request(server)
      .post(`${route}/login`)
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200);
  });
});
