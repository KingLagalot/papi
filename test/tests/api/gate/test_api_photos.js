const request = require('supertest');
const fs = require('fs');
const app = require('../../../../server');
const route = require('../../../factories/route.factory').route('/gate/photos');
const user_factory = require('../../../factories/user.factory');
const jwt_factory = require('../../../factories/jwt.factory');
const photo_factory = require('../../../factories/photo.factory');

require('should');

describe('API /gate/photos', function() {
  var server;
  var user;
  var token;
  var photo;
  // Setup and teardown functions
  this.beforeEach(async () => {
    server = app.listen();
    user = await user_factory.default(true, {}, ['password']);
    token = await jwt_factory.default(user.id);
    photo = await photo_factory.default(true, { author_id: user.id });
  });
  afterEach(async function() {
    server.close();
  });

  it('get /{id}', async function() {
    request(server)
      .get(`${route}/${photo.id}`)
      .set({ Token: token })
      .expect(200);
  });
  it('get / - photo not exist', async function() {
    request(server)
      .get(`${route}/00000000-0000-0000-0000-000000000000`)
      .set({ Token: token })
      .expect(404);
  });

  it('index /', async function() {
    request(server)
      .get(`${route}`)
      .set({ Token: token })
      .expect(200);
  });
  it('update /{id}', async function() {
    request(server)
      .put(`${route}/${photo.id}`)
      .set({ Token: token })
      .send({ title: 'Updated Title' })
      .expect(200);
  });
  it('create /', async function() {
    this.timeout(5000);
    await photo_factory.createImageFile(__dirname);

    await request(server)
      .post(`${route}`)
      .attach('file', `${__dirname}/test.jpg`)
      //.set({ Token: token })
      //.field('title', 'New Photo')
     // .field('description', 'test')
      //.expect(200);
    //fs.unlinkSync(`${__dirname}/test.jpg`);
    return;
  });
  it('delete /{id}', async function() {
    request(server)
      .del(`${route}/${photo.id}`)
      .set({ Token: token })
      .expect(204);
  });
});
