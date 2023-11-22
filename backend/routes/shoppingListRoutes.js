const express = require('express');
const {
  getShoppingList,
  deleteShoppingListItem,
  addShoppingListItem,
  getItems
} = require('../services/shoppingListService');
const router = express.Router();

router.get('/shopping-items', async (req, res) => {
  try {
    const shoppingList = await getShoppingList();
    res.json(shoppingList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.post('/shopping-items', async (req, res) => {
  const { itemname } = req.body;
  try {
    const newItem = await addShoppingListItem(itemname);
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/shopping-items', async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;