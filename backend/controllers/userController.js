const User = require("../models/user");
const passport = require("passport");

//signup
exports.signupUser = async (req, res) => {
    const { email,username, password } = req.body;

    try {
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser , (err)=>{
            if(err){
                res.status(401).json({ message: 'errro in login user after signup' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        }) 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//login
exports.loginUser = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.error('Error during authentication:', err);
          return res.status(500).json({ message: 'An error occurred' });
        }
        if (!user) {
          console.log('Authentication failed:', info.message);
          return res.status(401).json({ message: info.message });
        }
    
        req.logIn(user, (err) => {
          if (err) {
            console.error('Failed to log in:', err);
            return res.status(500).json({ message: 'Failed to log in' });
          }
    
          // Successfully logged in
          console.log('Logged in user:', user);
          res.status(200).json({ message: 'Login successful', user });
        });
      })(req, res, next);
}


//logout
exports.logout = async(req,res)=>{
    req.logout(err => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Logout successful' });
    });
}

//get user info
exports.getUser = async(req,res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      return res.json({ user: req.user });
    }
    return res.status(401).json({ message: 'User is not logged in' });
  } catch (error) {
    console.error('Error in getUser:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// Add this method to your userController.js
exports.getUserBookings = async (req, res) => {
  try {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const userId = req.user._id;
    
    // Import all models
    const Event = require("../models/event");
    const Catering = require("../models/catering");
    const EventDecoration = require("../models/eventDecoration");
    const OnlineBooking = require("../models/onlineBooking");

    // Fetch all bookings for the user
    const [eventBookings, cateringBookings, decorationBookings, onlineBookings] = await Promise.all([
      Event.find({ bookedBy: userId }).populate('createdBy', 'username'),
      Catering.find({ user: userId }),
      EventDecoration.find({ user: userId }),
      OnlineBooking.find({ user: userId })
    ]);

    res.json({
      events: eventBookings,
      catering: cateringBookings,
      decorations: decorationBookings,
      onlineBookings: onlineBookings
    });

  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};