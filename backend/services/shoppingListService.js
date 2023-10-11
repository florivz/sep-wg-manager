const pool = require('../db/connection');

const getShoppingList = async () => {
  try {
    const query = 'SELECT * FROM shoppingList';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const deleteShoppingListItem = async (itemID) => {
  try {
    const query = 'DELETE FROM shoppingList WHERE ItemID = $1';
    const result = await pool.query(query, [itemID]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const addShoppingListItem = async (itemName) => {
  try {
    const query = 'INSERT INTO shoppingList (ItemName) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [itemName]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getShoppingList,
  deleteShoppingListItem,
  addShoppingListItem,
};
