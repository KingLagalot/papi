'use strict';

const request = require('supertest');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route();

require('should');

describe('API - Images', function() {
  var server;
  this.beforeEach(function() {
    server = app.listen();
  });
  afterEach(function() {
    server.close();
  });
  it('index', done => {
    request(server)
      .get(`${route}/public/images`)
      .expect(200)
      .expect('ok', done);
  });
});
