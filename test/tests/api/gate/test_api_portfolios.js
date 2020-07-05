const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route(
  '/gate/portfolios',
);
const user_factory = require('../../../factories/user.factory');
const jwt_factory = require('../../../factories/jwt.factory');
const portfolio_factory = require('../../../factories/portfolio.factory');
const photo_factory = require('../../../factories/photo.factory');

require('should');

describe('API /gate/portfolios', function() {
  let server;
  var user;
  var token;
  var portfolio;
  this.beforeEach(async () => {
    server = app.listen();
    user = await user_factory.default(true, {}, ['password']);
    token = jwt_factory.default(user.id);
    portfolio = await portfolio_factory.default(true, { author_id: user.id });
    for (var i = 0; i < 4; i++) {
      var photo = await photo_factory.default(true, { author_id: user.id });
      await photo.addToPortfolio(portfolio.id);
    }
  });
  afterEach(async () => {
    server.close();
  });
  it('get', async function() {
    request(server)
      .get(`${route}/${portfolio.id}`)
      .set({ Token: token })
      .expect(200);
  });
  it('get - wrong id', async function() {
    request(server)
      .get(`${route}/00000000-0000-0000-0000-000000000000`)
      .set({ Token: token })
      .expect(404);
  });
  it('index', async function() {
    return request(server)
      .get(`${route}`)
      .set({ Token: token })
      .expect(200);
  });
  it('index - paginate', async function() {
    request(server)
      .get(`${route}`)
      .query({ page: 1 })
      .set({ Token: token })
      .expect(200);
  });
  it('delete /{id}', async function() {
    request(server)
      .del(`${route}/${portfolio.id}`)
      .set({ Token: token })
      .expect(204);
  });
});
