const pool = require('../db/connection');
const express = require('express');
const supertest = require('supertest');
const {
  getRoommates,
  getRoommateById,
  postRoommate,
  deleteRoommate
} = require('../services/roommateService');

// Create an Express app to use for testing
const app = express();
app.use(express.json());

// Mock roommates
const mockRoommates = [];

app.get('/api/roommates', async (req, res) => {
  const username = req.query.username;

  try {
    const roommates = mockRoommates.filter((r) => r.username === username);
    res.json(roommates);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/roommates/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const roommate = mockRoommates.find((r) => r.roommateid === id);

    if (!roommate) {
      res.status(404).json({ error: 'Roommate not found' });
    } else {
      res.json(roommate);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/roommates', async (req, res) => {
  const { firstname, lastname, email, username } = req.body;

  try {
    // Add the new roommate to mockRoommates
    const newRoommate = { firstname, lastname, email, username };
    mockRoommates.push(newRoommate);

    res.json(newRoommate);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/roommates/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    // Find the index of the roommate to delete
    const index = mockRoommates.findIndex((r) => r.roommateid === id);

    if (index === -1) {
      res.status(404).json({ error: 'Roommate not found' });
    } else {
      // Remove the roommate from mockRoommates
      mockRoommates.splice(index, 1);
      res.json({ message: 'Roommate deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

describe('Roommate Service', () => {
  beforeAll(async () => {
    await pool.connect(); // Establish a database connection for the tests
  });

  afterAll(async () => {
    await pool.end(); // Close the database connection after all tests
    mockRoommates.length = 0;
  });

  describe('getRoommates', () => {
    it('should retrieve all roommates for a specific username', async () => {
      const username = 'testuser';

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app).get('/api/roommates').query({ username });

        // Assert that the response status code is 200
        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });

  describe('getRoommateById', () => {
    it('should retrieve a roommate by their ID', async () => {
      const id = 1; 

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app).get(`/api/roommates/${id}`);

        // Assert that the response status code is 200
        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });

    it('should return a 404 status for a non-existing roommate ID', async () => {
      const id = 999;

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app).get(`/api/roommates/${id}`);

        // Assert that the response status code is 404
        expect(response.status).toBe(404);

        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });

  describe('postRoommate', () => {
    it('should successfully add a new roommate to the mock database', async () => {
      const firstname = 'John';
      const lastname = 'Doe';
      const email = 'johndoe@example.com';
      const username = 'testuser';

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .post('/api/roommates')
          .send({ firstname, lastname, email, username });

        // Assert that the response status code is 200
        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });

  describe('deleteRoommate', () => {
    it('should successfully delete a roommate by their ID', async () => {
      const id = 1; 

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app).delete(`/api/roommates/${id}`);

        // Assert that the response status code is 200
        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });

    it('should return a 404 status for deleting a non-existing roommate ID', async () => {
      const id = 999; // Use a non-existing roommate ID

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app).delete(`/api/roommates/${id}`);

        expect(response.status).toBe(404);

        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });
});
