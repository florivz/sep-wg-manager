const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/budgetRoutes'); // Ihr Router
const { getExpenses, postExpense, deleteExpense } = require('../services/budgetService'); // Ihre Service-Funktionen

// Mocken Sie die Service-Funktionen, um echte Datenbankaufrufe zu vermeiden
jest.mock('../services/budgetService');

// Verwenden Sie den Router in Ihrer Express-Anwendung
app.use(router);

describe('Budget Routes', () => {
  describe('GET /expenses/:username', () => {
    it('should return a list of expenses for a user', async () => {
      // Mocken Sie die getExpenses-Funktion, um Mock-Daten zurückzugeben
      getExpenses.mockResolvedValue([{ id: 1, description: 'Expense 1' }]);
      
      const response = await request(app).get('/expenses/username123');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, description: 'Expense 1' }]);
    });

    it('should handle errors and return 500 status on failure', async () => {
      // Mocken Sie die getExpenses-Funktion, um einen Fehler auszulösen
      getExpenses.mockRejectedValue(new Error('Database error'));
      
      const response = await request(app).get('/expenses/username123');
      
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An internal server error occurred' });
    });
  });

  describe('POST /expenses', () => {
    it('should create a new expense', async () => {
      // Mocken Sie die postExpense-Funktion, um Mock-Daten zurückzugeben
      postExpense.mockResolvedValue({ id: 1, description: 'New Expense' });

      const expenseData = {
        roommateid: 1,
        amount: 100,
        description: 'New Expense',
        username: 'username123',
      };

      const response = await request(app)
        .post('/expenses')
        .send(expenseData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, description: 'New Expense' });
    });

    it('should handle errors and return 500 status on failure', async () => {
      // Mocken Sie die postExpense-Funktion, um einen Fehler auszulösen
      postExpense.mockRejectedValue(new Error('Database error'));

      const expenseData = {
        roommateid: 1,
        amount: 100,
        description: 'New Expense',
        username: 'username123',
      };

      const response = await request(app)
        .post('/expenses')
        .send(expenseData);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An internal server error occurred' });
    });
  });

  describe('DELETE /expenses/:id', () => {
    it('should delete an expense by ID', async () => {
      // Mocken Sie die deleteExpense-Funktion, um einen Erfolg zurückzugeben
      deleteExpense.mockResolvedValue(true);

      const response = await request(app).delete('/expenses/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Expense deleted successfully' });
    });

    it('should handle errors when deleting an expense and return 500 status on failure', async () => {
      // Mocken Sie die deleteExpense-Funktion, um einen Fehler auszulösen
      deleteExpense.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/expenses/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An internal server error occurred' });
    });

    it('should return a 404 status if the expense to delete is not found', async () => {
      // Mocken Sie die deleteExpense-Funktion, um einen Erfolg (false) zurückzugeben
      deleteExpense.mockResolvedValue(false);

      const response = await request(app).delete('/expenses/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Expense not found' });
    });
  });
});
