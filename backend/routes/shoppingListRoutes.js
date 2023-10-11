const express = require('express');
const {
  getShoppingList,
  deleteShoppingListItem,
  addShoppingListItem,
} = require('../services/shoppingListService');
const router = express.Router();

// Route zum Abrufen der Einkaufsliste
router.get('/getShoppingList', async (req, res) => {
  try {
    const shoppingList = await getShoppingList();
    res.json(shoppingList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route zum Löschen eines Einkaufsgegenstands
router.delete('/deleteShoppingListItem/:itemID', async (req, res) => {
  const itemID = req.params.itemID;
  try {
    await deleteShoppingListItem(itemID);
    res.json({ message: 'Einkaufsgegenstand erfolgreich gelöscht.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route zum Hinzufügen eines neuen Einkaufsgegenstands
router.post('/addShoppingListItem', async (req, res) => {
  const { itemName } = req.body;
  try {
    const newItem = await addShoppingListItem(itemName);
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;