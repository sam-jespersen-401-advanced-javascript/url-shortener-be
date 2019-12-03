require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/model/User');

describe('url route', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a url', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'password' });

    return agent
      .post('/api/v1/urls')
      .send({
        customUrl: 'your-mom-42069',
        longUrl: 'google.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          customUrl: 'your-mom-42069',
          longUrl: 'google.com',
          hits: 0,
          user: expect.any(String),
          __v: 0
        });
      });
  });
});
