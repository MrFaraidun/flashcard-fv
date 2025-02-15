const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // ✅ Extract JWT from cookies

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Attach user data
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;
