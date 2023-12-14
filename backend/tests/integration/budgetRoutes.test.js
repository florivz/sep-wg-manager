const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/budgetRoutes');
const { getExpenses, postExpense, deleteExpense } = require('../services/budgetService');

jest.mock('../services/budgetService');

app.use(router);

describe('Budget Routes', () => {
  describe('GET /expenses/:username', () => {
    it('should return a list of expenses for a user', async () => {
      // Mock the getExpenses function to resolve with sample data
      getExpenses.mockResolvedValue([{ id: 1, description: 'Expense 1' }]);
      
      // Make a GET request to the route
      const response = await request(app).get('/expenses/username123');
      
      // Assert that the response status is 200 and contains the expected data
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, description: 'Expense 1' }]);
    });

    it('should handle errors and return 500 status on failure', async () => {
      // Mock the getExpenses function to reject with an error
      getExpenses.mockRejectedValue(new Error('Database error'));
      
      // Make a GET request to the route
      const response = await request(app).get('/expenses/username123');
      
      // Assert that the response status is 500 and contains an error message
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An internal server error occurred' });
    });
  });

  describe('POST /expenses', () => {
    it('should create a new expense', async () => {
      // Mock the postExpense function to resolve with sample data
      postExpense.mockResolvedValue({ id: 1, description: 'New Expense' });

      // Define expense data to send in the request
      const expenseData = {
        roommateid: 1,
        amount: 100,
        description: 'New Expense',
        username: 'username123',
      };

      // Make a POST request to the route with the expense data
      const response = await request(app)
        .post('/expenses')
        .send(expenseData);

      // Assert that the response status is 200 and contains the expected data
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, description: 'New Expense' });
    });

    it('should handle errors and return 500 status on failure', async () => {
      // Mock the postExpense function to reject with an error
      postExpense.mockRejectedValue(new Error('Database error'));

      // Define expense data to send in the request
      const expenseData = {
        roommateid: 1,
        amount: 100,
        description: 'New Expense',
        username: 'username123',
      };

      // Make a POST request to the route with the expense data
      const response = await request(app)
        .post('/expenses')
        .send(expenseData);

      // Assert that the response status is 500 and contains an error message
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An internal server error occurred' });
    });
  });

  describe('DELETE /expenses/:id', () => {
    it('should delete an expense by ID', async () => {
      // Mock the deleteExpense function to resolve as true
      deleteExpense.mockResolvedValue(true);

      // Make a DELETE request to the route with an expense ID
      const response = await request(app).delete('/expenses/1');

      // Assert that the response status is 200 and contains a success message
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Expense deleted successfully' });
    });

    it('should handle errors when deleting an expense and return 500 status on failure', async () => {
      // Mock the deleteExpense function to reject with an error
      deleteExpense.mockRejectedValue(new Error('Database error'));

      // Make a DELETE request to the route with an expense ID
      const response = await request(app).delete('/expenses/1');

      // Assert that the response status is 500 and contains an error message
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An internal server error occurred' });
    });

    it('should return a 404 status if the expense to delete is not found', async () => {
      // Mock the deleteExpense function to resolve as false (expense not found)
      deleteExpense.mockResolvedValue(false);

      // Make a DELETE request to the route with an expense ID
      const response = await request(app).delete('/expenses/1');

      // Assert that the response status is 404 and contains an error message
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Expense not found' });
    });
  });
});
