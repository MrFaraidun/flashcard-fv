const pool = require("../db");

const getAllCards = async (req, res) => {
  try {
    const { setid } = req.params;

    if (!setid) {
      return res.status(400).json({ error: "Set ID is required" });
    }

    // Get set name
    const setResult = await pool.query(
      "SELECT setname FROM sets WHERE setid = $1",
      [setid]
    );

    if (setResult.rows.length === 0) {
      return res.status(404).json({ error: "Set not found" });
    }

    const setName = setResult.rows[0].setname;

    // Get cards
    const cardsResult = await pool.query(
      "SELECT * FROM cards WHERE setid = $1",
      [setid]
    );

    res.status(200).json({ setName: setName, cards: cardsResult.rows });
    console.log(setName);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getAllCards;
