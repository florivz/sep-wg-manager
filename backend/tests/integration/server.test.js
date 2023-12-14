const express = require('express');
const supertest = require('supertest');
const app = require('../app');
const testApp = supertest(app);

// Test if local server is running
describe('Express App', () => {
  it('should respond with "Server is running" for /serverstatus route', async () => {
    try {
      const response = await testApp.get('/serverstatus');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Server is running');
    } catch (error) {
      fail(error);
    }
  });

  it('should respond with 404 for unknown routes', async () => {
    try {
      const response = await testApp.get('/nonexistentroute');
      expect(response.status).toBe(404);
    } catch (error) {
      fail(error);
    }
  });
});
