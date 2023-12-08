const pool = require('../db/connection');
const express = require('express');
const supertest = require('supertest');
const {
  getCleaningTasks,
  postCleaningTask,
  deleteCleaningTask
} = require('../services/cleaningTaskService');

// Create an Express app to use for testing
const app = express();
app.use(express.json());

// Define endpoints for testing purposes
app.get('/api/cleaning-tasks/:username', async (req, res) => {
  // Retrieve cleaning tasks for a specific username
  const username = req.params.username;
  const tasks = await getCleaningTasks(username);
  res.json(tasks);
});

app.post('/api/cleaning-tasks', async (req, res) => {
  // Add a new cleaning task to the database
  const { task, roommateId, username } = req.body;
  const result = await postCleaningTask(task, roommateId, username);
  res.json(result);
});

app.delete('/api/cleaning-tasks/:taskId', async (req, res) => {
  // Delete a cleaning task from the database by task ID
  const taskId = req.params.taskId;
  const result = await deleteCleaningTask(taskId);
  res.json(result);
});

describe('Cleaning Task Service', () => {
  beforeAll(async () => {
    await pool.connect(); // Establish a database connection for the tests
  });

  afterAll(async () => {
    await pool.end(); // Close the database connection after all tests
  });

  describe('getCleaningTasks', () => {
    it('should retrieve all cleaning tasks for a specific username', async () => {
      const username = 'testuser';

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app).get(`/api/cleaning-tasks/${username}`);

        // Assert that the response status code is 200
        expect(response.status).toBe(200);

        // Assert that the response body is an array
        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBeGreaterThan(0);
        // Add more expectations as needed
      } catch (error) {
        fail(error);
      }
    });

  });

  describe('postCleaningTask', () => {
    it('should add a new cleaning task to the database', async () => {
      const task = 'Clean the kitchen';
      const roommateId = 1;
      const username = 'testuser';

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app)
          .post('/api/cleaning-tasks')
          .send({ task, roommateId, username });

        // Assert that the response status code is 200
        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();
        // Add more expectations as needed
      } catch (error) {
        // Handle errors, fail the test if necessary
        fail(error);
      }
    });
  });

  describe('deleteCleaningTask', () => {
    it('should delete a cleaning task from the database by task ID', async () => {
      // Insert a test cleaning task into the database first
      const result = await pool.query(
        'INSERT INTO cleaningtasks (task, roommateid, username) VALUES ($1, $2, $3) RETURNING taskid',
        ['Test Task', 1, 'testuser']
      );
      const taskId = result.rows[0].taskid;

      try {
        // Perform a request to the service endpoint
        const response = await supertest(app).delete(`/api/cleaning-tasks/${taskId}`);

        // Assert that the response status code is 200
        expect(response.status).toBe(200);

        // You can also assert that the response contains information about the deleted task
        expect(response.body).toBeDefined();
        // Add more expectations as needed
      } catch (error) {
        // Handle errors, fail the test if necessary
        fail(error);
      }
    });
  });
});
