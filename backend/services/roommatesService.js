const pool = require('../db/connection');

/**
 * Retrieve all roommates from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of roommates.
 * @throws {Error} If there's an issue with the database query.
 */
const getAllRoommates = async () => {
  try {
    const result = await pool.query('SELECT * FROM roommates');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieve a roommate by their ID from the database.
 * @param {number} id - The ID of the roommate to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the roommate object or null if not found.
 * @throws {Error} If there's an issue with the database query.
 */
const getRoommateById = async (id) => {
  id = parseInt(id);
  try {
    const result = await pool.query('SELECT * FROM roommates WHERE roommateid = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

/**
 * Add a new roommate to the database.
 * @param {string} firstname - The first name of the new roommate.
 * @param {string} lastname - The last name of the new roommate.
 * @param {string} email - The email address of the new roommate.
 * @returns {Promise} A promise that resolves when the roommate is added successfully.
 * @throws {Error} If there's an issue with the database query.
 */
const addNewRoommate = async (firstname, lastname, email) => {
  try {
    await pool.query('INSERT INTO roommates (firstname, lastname, email) VALUES ($1, $2, $3)', [firstname, lastname, email]);
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a roommate by their ID from the database.
 * @param {number} id - The ID of the roommate to delete.
 * @returns {Promise} A promise that resolves when the roommate is deleted successfully.
 * @throws {Error} If there's an issue with the database query.
 */
const deleteRoommate = async (id) => {
  id = parseInt(id);
  try {
    await pool.query('DELETE FROM roommates WHERE roommateid = $1', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRoommates,
  getRoommateById,
  addNewRoommate,
  deleteRoommate
};
