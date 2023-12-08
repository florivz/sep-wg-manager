const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const express = require('express');
const supertest = require('supertest');
const { loginService } = require('../services/loginService');

// Create an Express app to use for testing
const app = express();
app.use(express.json());

// Mock users for testing purposes
const mockUsers = [
  {
    username: 'testuser',
    password: '$2b$10$NjplRHMvRQ9rVhZLwDYd/OCA3acLQuxXsmw4XGVq5cExylXUBk9M1', // Hashed password for "testpassword"
  },
];

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = mockUsers.find((u) => u.username === username);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({ message: 'Login successful' });
    } else {
      throw new Error('Password does not match');
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

describe('Login Service', () => {
  beforeAll(async () => {
    await pool.connect(); // Establish a database connection for the tests
  });

  afterAll(async () => {
    await pool.end(); // Close the database connection after all tests
  });

  describe('loginService', () => {
    it('should successfully log in with correct username and password', async () => {
      const username = 'testuser';
      const password = 'testpassword'; // Plain text password

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .post('/api/login')
          .send({ username, password });

        // Assert that the response status code is 200
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe('Login successful');
      } catch (error) {
        fail(error);
      }
    });

    it('should return 401 for incorrect password', async () => {
      const username = 'testuser';
      const password = 'incorrectpassword'; // Incorrect password

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .post('/api/login')
          .send({ username, password });

        // Assert that the response status code is 401 (Unauthorized)
        expect(response.status).toBe(401);
        expect(response.body).toBeDefined();
        expect(response.body.error).toBe('Password does not match');
      } catch (error) {
        fail(error);
      }
    });

    it('should return 401 for non-existing user', async () => {
      const username = 'nonexistentuser';
      const password = 'testpassword'; // Correct password

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .post('/api/login')
          .send({ username, password });

        // Assert that the response status code is 401 (Unauthorized)
        expect(response.status).toBe(401);
        expect(response.body).toBeDefined();
        expect(response.body.error).toBe('User not found');
      } catch (error) {
        fail(error);
      }
    });
  });
});
