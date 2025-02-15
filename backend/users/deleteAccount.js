const fs = require("fs").promises;
const path = require("path");
const pool = require("../db");

const deleteAccount = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "User is not logged in." });
    }

    try {
        const userResult = await pool.query(
            "SELECT ProfilePictureUrl FROM Users WHERE UserID = $1",
            [req.session.userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const profilePictureUrl = userResult.rows[0].profilepictureurl;

        const result = await pool.query(
            "DELETE FROM Users WHERE UserID = $1 RETURNING UserID",
            [req.session.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        if (profilePictureUrl && profilePictureUrl !== '/uploads/user.png') {
            const filePath = path.resolve(__dirname, '..', 'uploads', path.basename(profilePictureUrl));
            try {
                await fs.unlink(filePath);
                console.log('File deleted:', filePath);
            } catch (err) {
                console.error('Error deleting file:', err.message);
            }
        }

        await new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) reject(err);
                resolve();
            });
        });

        res.clearCookie("connect.sid");
        res.json({ message: "Account deleted successfully." });
    } catch (err) {
        console.error("Error deleting account:", err.message);
        res.status(500).json({ error: "Failed to delete account." });
    }
};

module.exports = deleteAccount;
