const jwt = require("jsonwebtoken");
const pool = require('../db');

const getAllTodos = async (req, res) => {
    // Extract the token from the cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Authentication token missing." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here

        const userId = decoded.userId; // Extract userId from the decoded token

        const todos = await pool.query(
            "SELECT * FROM todo WHERE userId = $1 ORDER BY createdAt ASC",
            [userId]
        );

        console.log(todos.rows);
        res.json(todos.rows); // Return the todos for the logged-in user
    } catch (err) {
        console.error(err.message);

        // Handle errors: token expired, invalid token, etc.
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token." });
        } else if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired." });
        }

        res.status(500).json({ error: "Server error" });
    }
};

module.exports = getAllTodos;
