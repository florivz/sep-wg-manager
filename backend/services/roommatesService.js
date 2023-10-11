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


module.exports = {
  getAllRoommates,
  getRoommateById,
};