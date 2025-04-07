const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const register = async (req, res) => {
  const { Name, Email, Password } = req.body;

  if (!Name || !Email || !Password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (Password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long." });
  }

  if (!/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const existingUser = await pool.query(
      "SELECT userid FROM users WHERE email = $1 OR name = $2",
      [Email, Name]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email or Name already exists." });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, passwordhash) 
       VALUES ($1, $2, $3) RETURNING userid, email, name`,
      [Name, Email, hashedPassword]
    );

    // Generate JWT Token
    const token = jwt.sign(
      { userId: result.rows[0].userid },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "Registration successful! Redirecting to profile setup...",
      email: result.rows[0].email,
      name: result.rows[0].name,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
};

module.exports = register;
