'use strict';

const request = require('supertest');
const app = require('../../../../server');

require('should');

describe('API - Users', function() {
  var server;
  this.beforeEach(function() {
    server = app.listen();
  });
  afterEach(function() {
    server.close();
  });
  it('index', done => {
    request(server)
      .get('/')
      .expect(200)
      .expect('ok', done);
  });
});
