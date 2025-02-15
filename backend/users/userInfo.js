const authMiddleware = require("../middleware/authMiddleware");
const pool = require("../db");

const userInfo = async (req, res) => {
    try {
        // Corrected query with lowercase table and column names
        const user = await pool.query(
            "SELECT name, email, age, purposeofuse, profilepictureurl FROM users WHERE userid = $1",
            [req.user.userId]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }




        res.json({
            UserID: req.user.userId,
            Name: user.rows[0].name,
            Email: user.rows[0].email,
            Age: user.rows[0].age,
            PurposeOfUse: user.rows[0].purposeofuse,
            ProfilePictureUrl: user.rows[0].profilepictureurl || "../uploads/user.png",
        });
    } catch (err) {
        console.error("Error fetching user info:", err.message);
        res.status(500).json({ error: "Server error." });
    }
};

module.exports = [authMiddleware, userInfo];
