// Import necessary dependencies
const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/registerRoutes');

// Middleware to parse incoming JSON data
app.use(express.json());

// Use the registerRoutes for routes starting with '/api'
app.use('/api', router);

// Test suite for Register Routes
describe('Register Routes', () => {
  it('should create a new user with valid data', async () => {
    // Define sample user data for testing
    const userData = { username: 'testuser', password: 'testpassword', email: 'test@example.com' };

    // Send a POST request to the '/api/user' endpoint with userData
    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(200);

    // Check if the response body is defined and contains a 'success' property with a value of true
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
  });

  it('should return a 500 status for invalid username or password', async () => {
    // Define sample user data with a short username and password for testing
    const userData = { username: 'user', password: 'pass', email: 'test@example.com' };

    // Send a POST request to the '/api/user' endpoint with userData and expect a 500 status code
    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(500);

    // Check if the response body is defined and contains expected properties
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('password too short');
  });
});
