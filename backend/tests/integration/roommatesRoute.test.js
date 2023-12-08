// Import necessary dependencies
const request = require('supertest');
const express = require('express');
const app = express();

// Import the router for roommatesRoutes
const router = require('../routes/roommatesRoutes');

// Middleware to parse incoming JSON data
app.use(express.json());

// Use the roommatesRoutes for routes starting with '/api'
app.use('/api', router);

// Test suite for Roommates Routes
describe('Roommates Routes', () => {
  it('should get all roommates for a user', async () => {
    // Define a sample username for testing
    const username = 'testuser';

    // Send a GET request to retrieve all roommates for the user
    const response = await request(app)
      .get(`/api/roommates/${username}`)
      .expect(200);

    // Check if the response body is defined
    expect(response.body).toBeDefined();
  });

  it('should create a new roommate with valid data', async () => {
    // Define sample roommate data for testing
    const roommateData = { firstname: 'John', lastname: 'Doe', email: 'johndoe@example.com', username: 'testuser' };

    // Send a POST request to create a new roommate with roommateData
    const response = await request(app)
      .post('/api/roommates')
      .send(roommateData)
      .expect(201);

    // Check if the response body is defined and contains a 'success' property with a value of true
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
  });

  it('should delete a roommate by ID', async () => {
    // Define the ID of the roommate to delete
    const roomId = 1;

    // Send a DELETE request to delete the roommate by ID
    const response = await request(app)
      .delete(`/api/roommates/${roomId}`)
      .expect(200);

    // Check if the response body is defined and contains a 'success' property with a value of true
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
  });

  it('should return a 404 status if the roommate to delete is not found', async () => {
    // Define an ID that is not present to test the case where the roommate is not found
    const roomId = 999;

    // Send a DELETE request with an invalid ID and expect a 404 status
    const response = await request(app)
      .delete(`/api/roommates/${roomId}`)
      .expect(404);

    // Check if the response body is defined
    expect(response.body).toBeDefined();
  });
});