
const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/gate/portfolios');

require('should');

describe('API /gate/portfolios', function () {
  let server;
  this.beforeEach(() => {
    server = app.listen();
  });
  afterEach(function() {
    server.close();
  });
  it('get', function(done) {
    request(server)
      .get(`${route}/${id}`)
      .send({ type: 'js' })
      .expect(200)
      .expect('ok', done);
  });
  it('get - wrong id', function(done) {
    request(server)
      .get(`${route}/${id}`)
      .send({ type: 'js' })
      .expect(404)
      .expect('ok', done);
  });
  it('get - not public', function(done) {
    request(server)
      .get(`${route}/${id}`)
      .send({ type: 'js' })
      .expect(404)
      .expect('ok', done);
  });
  it('index', function(done) {
    request(server)
      .get(`${route}`)
      .send({ type: 'js' })
      .expect(200)
      .expect('ok', done);
  });
  it('index - paginate', function(done) {
    request(server)
      .get(`${route}`)
      .send({ type: 'js' })
      .expect(200)
      .expect('ok', done);
  });
  it('index - wrong id', function(done) {
    request(server)
      .get(`${route}`)
      .send({ type: 'js' })
      .expect(404)
      .expect('ok', done);
  });
});
