const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const checkLogin = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    try {
        // Corrected query with lowercase table and column names
        const user = await pool.query(
            "SELECT profilepictureurl FROM users WHERE userid = $1",
            [req.user.userId] // ✅ Use decoded JWT userId
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        console.log("Venus", user.rows[0].profilepictureurl);

        return res.json({
            isLoggedIn: true,
            userId: req.user.userId,
            profilePictureUrl: user.rows[0].profilepictureurl || "../uploads/user.png",
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = [authMiddleware, checkLogin]; // ✅ Protect the route
