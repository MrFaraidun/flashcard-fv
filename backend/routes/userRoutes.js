const express = require("express");
const router = express.Router();
const { profileSetup, upload } = require("../users/profileSetup");
const register = require("../users/register");
const login = require("../users/login");
const editUserInfo = require("../users/editUserInfo");
const deleteAccount = require("../users/deleteAccount");
const logout = require("../users/logout");
const checkLogin = require("../users/checkLogin");
const authMiddleware = require("../middleware/authMiddleware");
const { getStreak } = require("../users/streak");

//insert

//post from frontedn to backend
router.post("/register", register); //              https://localhost:5000/flashcard/register
router.post("/login", login);

router.post(
  "/profile-setup",
  authMiddleware,
  upload.single("profilePicture"),
  profileSetup
);

//put == edit
router.put(
  "/edit-user-info",
  authMiddleware,
  upload.single("profilePicture"),
  editUserInfo
);

router.delete("/delete-account", authMiddleware, deleteAccount);
router.get("/check-login", authMiddleware, checkLogin);
router.post("/logout", authMiddleware, logout);
router.get("/streak/current", authMiddleware, getStreak);

module.exports = router;
