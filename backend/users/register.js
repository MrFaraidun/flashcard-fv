const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const register = async (req, res) => {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (Password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

    if (!/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    try {
        // Corrected the query with lowercase table and column names
        const existingUser = await pool.query(
            "SELECT userid FROM users WHERE email = $1 OR name = $2",
            [Email, Name]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email or Name already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Insert user into DB
        const result = await pool.query(
            "INSERT INTO users (name, email, passwordhash) VALUES ($1, $2, $3) RETURNING userid, profilepictureurl",
            [Name, Email, hashedPassword]
        );

        // Generate JWT Token
        const token = jwt.sign(
            { userId: result.rows[0].userid, email: Email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send token via HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({
            message: "User registered successfully.",
            userId: result.rows[0].userid,
            Name,
            Email,
            ProfilePictureUrl: result.rows[0].profilepictureurl || "/uploads/user.png",
        });
    } catch (err) {
        console.error("Error during registration:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = register;
