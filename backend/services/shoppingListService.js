const pool = require('../db/connection');

/**
 * Retrieves the entire shopping list from the database.
 * @param {string} username - The shared apartment this items belong to.
 * @returns {Promise<Array>} Array of shopping list items.
 * @throws {Error} If there's an issue with the database query.
 */
const getShoppingList = async (username) => {
  try {
    const query = 'SELECT * FROM shoppinglist WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a shopping list item by its ID.
 * @param {number} itemid - The ID of the item to be deleted.
 * @returns {Promise<Array>} Array of deleted items.
 * @throws {Error} If there's an issue with the database query.
 */
const deleteShoppingListItem = async (itemid) => {
  try {
    const query = 'DELETE FROM shoppinglist WHERE itemid = $1';
    const result = await pool.query(query, [itemid]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

/**
 * Adds a new shopping list item with the specified name.
 * @param {string} itemname - The name of the item to be added.
 * @param {string} username - The shared apartment this items belong to.
 * @returns {Promise<Object>} The added shopping list item.
 * @throws {Error} If there's an issue with the database query.
 */
const addShoppingListItem = async (itemname, username) => {
  try {
    const query = 'INSERT INTO shoppinglist (ItemName, username) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [itemname, username]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves a list of items with their IDs and names from the database.
 * @returns {Promise<Array>} Array of items with itemid and itemname.
 * @throws {Error} If there's an issue with the database query.
 */
const getItems = async () => {
  try {
    const query = 'SELECT itemid, itemname FROM shoppinglist';
    const result = await pool.query(query);
    return result.rows;
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
