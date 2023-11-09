const pool = require('../db/connection');

const getAllRoommates = async () => {
  try {
    const result = await pool.query('SELECT * FROM roommates');
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const getRoommateById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM roommates WHERE PersonID = $1', [id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const addNewRoommate = async (firstname, lastname, email) => {
  try {
    const result = await pool.query('INSERT INTO roommates (firstname, lastname, email) VALUES ($1, $2, $3)', [firstname, lastname, email]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteRoommate = async (id) => {
  try {
    id = parseInt(id);
    const result = await pool.query('DELETE FROM roommates WHERE roommateid = $1', [id]);
    return result;
  } catch (err) {
    throw err;
  }
}


module.exports = {
  getAllRoommates,
  getRoommateById,
  addNewRoommate,
  deleteRoommate
};
