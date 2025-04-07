const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email) {
    return res.status(400).json({ error: "Email is required." });
  }
  if (!Password) {
    return res.status(400).json({ error: "Password is required." });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      Email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(
      Password,
      user.rows[0].passwordhash
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.rows[0].userid },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Determine the profile picture URL
    let profilePictureUrl = user.rows[0].profilepictureurl;
    if (profilePictureUrl && !profilePictureUrl.startsWith("http")) {
      profilePictureUrl = `http://localhost:5000${profilePictureUrl}`;
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.json({
      message: "Login successful",
      Name: user.rows[0].name,
      ProfilePictureUrl: profilePictureUrl || "../uploads/user.png",
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = login;
