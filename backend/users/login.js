const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const login = async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ error: "Email and Password are required." });
    }

    try {
        // Corrected the query with lowercase table and column names
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [Email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        const validPassword = await bcrypt.compare(Password, user.rows[0].passwordhash);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user.rows[0].userid, email: user.rows[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send token via HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookie only in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });


        console.log("login", user.rows[0].profilepictureurl);

        res.json({
            message: "Login successful",
            UserID: user.rows[0].userid,
            Name: user.rows[0].name,
            ProfilePictureUrl: `http://localhost:5000${user.rows[0].profilepictureurl}`
            ,
        });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ error: "Server error." });
    }
};

module.exports = login;
