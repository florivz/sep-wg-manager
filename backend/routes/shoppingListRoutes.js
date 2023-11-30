const express = require('express');
const router = express.Router();
const {
  getShoppingList,
  deleteShoppingListItem,
  addShoppingListItem,
  getItems
} = require('../services/shoppingListService');

// Get shopping list items
router.get('/shopping-items', async (req, res) => {
  try {
    const shoppingList = await getShoppingList();
    res.json(shoppingList);
  } catch (err) {
    console.error('Error while fetching shopping list:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a shopping list item by ID
router.delete('/shopping-items/:itemID', async (req, res) => {
  const itemID = parseInt(req.params.itemID);
  try {
    const result = await deleteShoppingListItem(itemID);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.json({ message: 'Item successfully deleted.' });
  } catch (err) {
    console.error('Error while deleting item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new shopping list item
router.post('/shopping-items', async (req, res) => {
  const { itemname } = req.body;
  try {
    const newItem = await addShoppingListItem(itemname);
    res.json(newItem);
  } catch (err) {
    console.error('Error while adding item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (err) {
    console.error('Error while fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
