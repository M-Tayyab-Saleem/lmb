const express = require("express");
const { loginUser, signupUser, logout, getUser,getUserBookings } = require("../controllers/userController");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn } = require("../middleware/authMiddleware");


router.post("/api/signup", signupUser); // Create User
router.post("/api/login", loginUser); // User Login
router.get("/api/logout" , logout) // logout
router.get("/api/getUser" , getUser)
router.get("/api/user/bookings", isLoggedIn, getUserBookings);


module.exports = router;
