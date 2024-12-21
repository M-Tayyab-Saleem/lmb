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
            return res.status(500).json({ message: 'An error occurred' });
        }
        if (!user) {
            return res.status(401).json({ message: info.message }); 
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log in' });
            }
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
exports.getUser = async(req,res)=>{
    console.log(req.user)
    res.json({ user: req.user });
}