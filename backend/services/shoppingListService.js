const pool = require('../db/connection');

const getShoppingList = async () => {
  try {
    const query = 'SELECT * FROM shoppinglist';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const deleteShoppingListItem = async (itemid) => {
  try {
    console.log(itemid);
    const query = 'DELETE FROM shoppinglist WHERE itemid = $1';
    const result = await pool.query(query, [itemid]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const addShoppingListItem = async (itemname) => {
  try {
    const query = 'INSERT INTO shoppinglist (ItemName) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [itemname]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getItems = async () => {
  try {
    const query = 'SELECT itemid, itemname FROM shoppinglist';
    const result = await pool.query(query);
    return result.rows
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getShoppingList,
  deleteShoppingListItem,
  addShoppingListItem,
  getItems
};
