const request = require('supertest');
const app = require('./app');

describe('express app', () => {
  it('should respond to /', async () => {
    const response = await request(app).get('/');
    expect(response).toBeTruthy();
  });
})