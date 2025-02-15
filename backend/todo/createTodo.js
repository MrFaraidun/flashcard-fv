const pool = require("../db");

const createTodo = async (req, res) => {
    try {
        const { task, userid } = req.body;

        if (!task || !userid) {
            return res.status(400).json({ error: "Task and UserID are required" });
        }

        const newTodo = await pool.query(
            "INSERT INTO todo (task, userid) VALUES ($1, $2) RETURNING *",
            [task, userid]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = createTodo;
