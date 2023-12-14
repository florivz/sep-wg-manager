// Import required dependencies and services
const pool = require('../db/connection'); 
const express = require('express');
const supertest = require('supertest');
const {
  getShoppingList,
  deleteShoppingListItem,
  postShoppingListItem,
  getItems
} = require('../services/shoppingListService'); 
const app = express();
app.use(express.json());

// Mock shopping list array to simulate a database
const mockShoppingList = [];

// Get shopping list items for a specific username
app.get('/api/shopping-list', async (req, res) => {
  const username = req.query.username;

  try {
    // Filter the mock shopping list for items with the provided username
    const shoppingList = mockShoppingList.filter((item) => item.username === username);
    res.json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a shopping list item by its ID
app.delete('/api/shopping-list/:itemid', async (req, res) => {
  const itemid = parseInt(req.params.itemid, 10);

  try {
    const index = mockShoppingList.findIndex((item) => item.itemid === itemid);

    if (index === -1) {
      // Item not found in the mock shopping list
      res.status(404).json({ error: 'Item not found' });
    } else {
      // Remove the item from the mock shopping list
      mockShoppingList.splice(index, 1);
      res.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new shopping list item
app.post('/api/shopping-list', async (req, res) => {
  const { itemname, username } = req.body;

  try {
    // Create a new item and add it to the mock shopping list
    const newItem = { itemid: mockShoppingList.length + 1, itemname, username };
    mockShoppingList.push(newItem);

    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a list of items with their IDs and names
app.get('/api/items', async (req, res) => {
  try {
    // Map the mock shopping list to retrieve item IDs and names
    const items = mockShoppingList.map((item) => ({ itemid: item.itemid, itemname: item.itemname }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Shopping list service functions
describe('Shopping List Service', () => {
  beforeAll(async () => {
    // Connect to the database before running tests
    await pool.connect();
  });

  afterAll(async () => {
    // Close the database connection and clear the mock shopping list after tests
    await pool.end();
    mockShoppingList.length = 0;
  });

  describe('getShoppingList', () => {
    it('should retrieve the shopping list for a specific username', async () => {
      const username = 'testuser';

      try {
        // Send a test GET request to retrieve shopping list items
        const response = await supertest(app).get('/api/shopping-list').query({ username });

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });

  describe('deleteShoppingListItem', () => {
    it('should successfully delete a shopping list item by its ID', async () => {
      const itemid = 1;

      try {
        // Send a test DELETE request to delete a shopping list item
        const response = await supertest(app).delete(`/api/shopping-list/${itemid}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });

    it('should return a 404 status for deleting a non-existing item ID', async () => {
      const itemid = 999;

      try {
        // Send a test DELETE request to delete a non-existing item
        const response = await supertest(app).delete(`/api/shopping-list/${itemid}`);

        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });

  describe('postShoppingListItem', () => {
    it('should successfully add a new shopping list item to the mock database', async () => {
      const itemname = 'Milk';
      const username = 'testuser';

      try {
        // Send a test POST request to add a new shopping list item
        const response = await supertest(app)
          .post('/api/shopping-list')
          .send({ itemname, username });

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });

  describe('getItems', () => {
    it('should retrieve a list of items with their IDs and names', async () => {
      try {
        // Send a test GET request to retrieve a list of items
        const response = await supertest(app).get('/api/items');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      } catch (error) {
        fail(error);
      }
    });
  });
});
