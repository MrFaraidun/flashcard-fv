const fs = require("fs").promises;
const path = require("path");
const pool = require("../db");

const editUserInfo = async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized: User is not logged in." });
    }

    const { name, age, purposeOfUse } = req.body;
    let profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/user.png'; // Default profile picture

    try {
        const userResult = await pool.query("SELECT ProfilePictureUrl FROM Users WHERE UserID = $1", [req.user.userId]);

        if (userResult.rows.length > 0) {
            const oldProfilePicture = userResult.rows[0].profilepictureurl;

            if (profilePictureUrl && oldProfilePicture && oldProfilePicture !== '/uploads/user.png' && oldProfilePicture !== profilePictureUrl) {
                const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(oldProfilePicture));

                try {
                    await fs.access(oldImagePath); // Check if file exists
                    await fs.unlink(oldImagePath); // Delete if exists
                    console.log("Old profile picture deleted successfully.");
                } catch (err) {
                    console.error("Error deleting old profile picture:", err);
                }
            }
        } else {
            profilePictureUrl = '/uploads/user.png'; // Use default profile picture if no existing one
        }

        const ageValue = age !== undefined && age !== null && age !== "" ? parseInt(age, 10) : null;

        const query = `
            UPDATE Users
            SET 
                Name = COALESCE($1, Name), 
                Age = COALESCE($2, Age), 
                PurposeOfUse = COALESCE($3, PurposeOfUse),
                ProfilePictureUrl = COALESCE($4, ProfilePictureUrl),
                UpdatedAt = CURRENT_TIMESTAMP
            WHERE UserID = $5
            RETURNING Name, Age, PurposeOfUse, ProfilePictureUrl;
        `;
        const values = [name || null, ageValue, purposeOfUse || null, profilePictureUrl, req.user.userId];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found or failed to update." });
        }

        const updatedUser = result.rows[0];
        res.json({
            message: "Profile updated successfully.",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error updating user info:", err.message);
        res.status(500).json({ error: "Failed to update user info." });
    }
};

module.exports = editUserInfo;
