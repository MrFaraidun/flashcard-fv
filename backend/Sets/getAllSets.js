const pool = require("../db");

const getAllSets = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from token

    const sets = await pool.query(
      "SELECT * FROM sets WHERE userId = $1 ORDER BY createdAt ASC",
      [userId]
    );
    res.json(sets.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getAllSets;
