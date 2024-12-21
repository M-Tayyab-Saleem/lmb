const express = require("express");
const { loginUser, signupUser, logout, getUser } = require("../controller/userController");
const router = express.Router();
const passport = require("passport");


router.post("/api/signup", signupUser); // Create User
router.post("/api/login", loginUser); // User Login
router.get("/api/logout" , logout) // logout
router.get("/api/getUser" , getUser)

module.exports = router;
