const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/loginRoutes'); // Import the login router
app.use(express.json());
app.use('/api', router); 

describe('Login Routes', () => {
  it('should authenticate a user with correct credentials', async () => {
    const credentials = { username: 'testuser', password: 'testpassword' }; 

    // Send a POST request to the login endpoint with correct credentials
    const response = await request(app)
      .post('/api/login')
      .send(credentials)
      .expect(200); // Expect a 200 OK response

    // Assert that the response body is defined
    expect(response.body).toBeDefined();

    // Assert that the 'success' property in the response body is true
    expect(response.body.success).toBe(true);
  });

  it('should return a 401 status for incorrect credentials', async () => {
    const credentials = { username: 'testuser', password: 'wrongpassword' }; 

    // Send a POST request to the login endpoint with incorrect credentials
    const response = await request(app)
      .post('/api/login')
      .send(credentials)
      .expect(401); // Expect a 401 Unauthorized response

    // Assert that the response body is defined
    expect(response.body).toBeDefined();

    // Assert that the 'success' property in the response body is false
    expect(response.body.success).toBe(false);
  });

  it('should return a 500 status for server errors', async () => {
    // In this test case, you can simulate a server error scenario

    // Send a request that triggers a server error (e.g., missing middleware or route handler)
    const response = await request(app)
      .post('/api/login')
      .send({})
      .expect(500); // Expect a 500 Internal Server Error response

    // You can further assert or handle the error response as needed
  });
});
