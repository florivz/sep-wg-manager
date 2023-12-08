// Import necessary modules
const request = require('supertest');
const express = require('express');
const app = express();

// Import the router for cleaning plan routes
const router = require('../routes/cleaningPlanRoutes');

// Configure Express to parse JSON requests
app.use(express.json());

// Mount the cleaning plan routes under '/api' path
app.use('/api', router);

// Describe the test suite for Cleaning Plan Routes
describe('Cleaning Plan Routes', () => {
  // Test case: Get all cleaning tasks for a user
  it('should get all cleaning tasks for a user', async () => {
    const username = 'testuser';
    const response = await request(app)
      .get(`/api/cleaning-tasks/${username}`)
      .expect(200); // Expect a 200 OK response
    expect(response.body).toBeDefined();
  });

  // Test case: Add a new cleaning task
  it('should add a new cleaning task', async () => {
    const task = { task: 'Clean the kitchen', roommateId: 1, username: 'testuser' };
    const response = await request(app)
      .post('/api/cleaning-tasks')
      .send(task)
      .expect(200); // Expect a 200 OK response
    expect(response.body).toBeDefined();
  });

  // Test case: Delete a cleaning task
  it('should delete a cleaning task', async () => {
    const taskId = 1;
    const response = await request(app)
      .delete(`/api/cleaning-tasks/${taskId}`)
      .expect(200); // Expect a 200 OK response
    expect(response.body).toBeDefined();
  });

  // Test case: Return a 404 status when trying to delete a non-existent cleaning task
  it('should return a 404 status when trying to delete a non-existent cleaning task', async () => {
    const taskId = 999;
    const response = await request(app)
      .delete(`/api/cleaning-tasks/${taskId}`)
      .expect(404); // Expect a 404 Not Found response
    expect(response.body).toBeDefined();
  });
});
