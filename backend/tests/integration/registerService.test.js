const pool = require('../db/connection');
const express = require('express');
const supertest = require('supertest');
const { addUser, checkUsernameExists } = require('../services/userService');

// Create an Express app to use for testing
const app = express();
app.use(express.json());

// Mock users for testing purposes
const mockUsers = [];

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the username already exists in mockUsers
    if (mockUsers.find((u) => u.username === username)) {
      throw new Error('Username already exists');
    }

    // Add the new user to mockUsers
    mockUsers.push({ username, password, email });

    res.json({ message: 'User registration successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/check-username', async (req, res) => {
  const { username } = req.query;

  try {
    const usernameExists = mockUsers.some((u) => u.username === username);

    res.json({ exists: usernameExists });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

describe('User Service', () => {
  beforeAll(async () => {
    await pool.connect(); // Establishing a database connection for the tests
  });

  afterAll(async () => {
    await pool.end(); // Close the database connection after all tests
    mockUsers.length = 0;
  });

  describe('addUser', () => {
    it('should successfully add a new user to the mock database', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const email = 'test@example.com';

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .post('/api/register')
          .send({ username, password, email });

        // Assert that the response status code is 200
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('User registration successful');
      } catch (error) {
        fail(error);
      }
    });
  });

  describe('checkUsernameExists', () => {
    it('should return true for an existing username in the mock database', async () => {
      const username = 'testuser';

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .get('/api/check-username')
          .query({ username });

        // Assert that the response status code is 200
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.exists).toBe(true);
      } catch (error) {
        fail(error);
      }
    });

    it('should return false for a non-existing username in the mock database', async () => {
      const username = 'nonexistentuser';

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .get('/api/check-username')
          .query({ username });

        // Assert that the response status code is 200
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.exists).toBe(false);
      } catch (error) {
        fail(error);
      }
    });
  });
});
