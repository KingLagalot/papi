const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route(
  '/gate/account',
);
const user_factory = require('../../../factories/user.factory');
const jwt_factory = require('../../../factories/jwt.factory');

require('should');

describe('API /gate/account', function() {
  let server;
  var user;
  var token;
  this.beforeEach(async () => {
    server = app.listen();
    user = await user_factory.default(true, {}, ['password']);
    token = jwt_factory.default(user.id);
  });
  afterEach(async function() {
    server.close();
  });
  it('get /', async function() {
    return request(server)
      .get(`${route}`)
      .set({ Token: token })
      .expect(200);
  });
  it('update /', async function() {
    return request(server)
      .put(`${route}`)
      .send({ first_name: 'Test', last_name: 'Test' })
      .set({ Token: token })
      .expect(200);
  });
});
