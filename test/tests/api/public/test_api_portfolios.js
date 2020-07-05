const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route(
  '/public/portfolios',
);
const portfolio_factory = require('../../../factories/portfolio.factory');
const Portfolio = require('../../../../lib/models/photo.model');

require('should');

describe('API /public/portfolios', function() {
  let server;
  let portfolio;
  let id;

  this.beforeEach(async () => {
    server = app.listen();
    portfolio = await portfolio_factory.default(true);
    id = portfolio.id;
  });
  afterEach(async function() {
    server.close();
  });
  it('get /:id', async function() {
    return request(server)
      .get(`${route}/${id}`)
      .expect(200);
  });
  it('get /:id - wrong id', async function() {
    return request(server)
      .get(`${route}/00000000-0000-0000-0000-000000000000`)
      .expect(404);
  });
  it('get /:id - not public', async function() {
    return request(server)
      .get(`${route}/${id}`)
      .expect(404);
  });
});
