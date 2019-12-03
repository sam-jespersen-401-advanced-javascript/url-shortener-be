require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
describe('url routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a custom url', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'password' });
    return agent
      .post('/api/v1/url')
      .send({
        customUrl: 'murmuring-chamber',
        longUrl: 'https://www.google.com/'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          customUrl: 'murmuring-chamber',
          longUrl: 'https://www.google.com/',
          shortUrl: expect.any(String),
          hits: 0,
          user: expect.any(String),
          __v: 0
        });
      });
  });
  it('creates a generated url', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test2', password: 'password' });
    return agent
      .post('/api/v1/url')
      .send({
        longUrl: 'https://www.google.com/'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          longUrl: 'https://www.google.com/',
          shortUrl: expect.any(String),
          hits: 0,
          user: expect.any(String),
          __v: 0
        });
      });
  });
});
