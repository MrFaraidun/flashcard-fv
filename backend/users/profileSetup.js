const jwt = require("jsonwebtoken");
const multer = require("multer");
const pool = require("../db");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const profileSetup = async (req, res) => {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided." });
    }

    try {
        // Verify and decode JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { age, purposeOfUse } = req.body;
        if (!age || !purposeOfUse) {
            return res.status(400).json({ error: "Age and Purpose of Use are required." });
        }

        // Handle profile picture upload
        const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : null;

        // Update user profile in the database
        const result = await pool.query(
            `UPDATE Users
             SET Age = $1, PurposeOfUse = $2, ProfilePictureUrl = $3, UpdatedAt = CURRENT_TIMESTAMP
             WHERE UserID = $4
             RETURNING *`,
            [age || null, purposeOfUse || null, profilePictureUrl, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found or failed to update." });
        }

        res.json({
            message: "Profile updated successfully.",
            UserID: result.rows[0].userid,
            Name: result.rows[0].name,
            ProfilePictureUrl: result.rows[0].profilepictureurl || null,
        });
    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).json({ error: "Failed to update profile." });
    }
};

module.exports = { profileSetup, upload };
