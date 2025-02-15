const express = require("express");
const router = express.Router();
const { profileSetup, upload } = require("../users/profileSetup");
const register = require("../users/register");
const login = require("../users/login");
const editUserInfo = require("../users/editUserInfo");
const deleteAccount = require("../users/deleteAccount");
const userInfo = require("../users/userInfo");
const logout = require("../users/logout");
const checkLogin = require("../users/checkLogin");
const authMiddleware = require("../middleware/authMiddleware"); // Protect sensitive routes

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes (Require Auth Middleware)
router.post("/profile-setup", authMiddleware, upload.single("profilePicture"), profileSetup);
router.put("/edit-user-info", authMiddleware, upload.single("profilePicture"), editUserInfo);
router.delete("/delete-account", authMiddleware, deleteAccount);
router.get("/user-info", authMiddleware, userInfo);
router.get("/check-login", authMiddleware, checkLogin);
router.get("/logout", authMiddleware, logout);

module.exports = router;
