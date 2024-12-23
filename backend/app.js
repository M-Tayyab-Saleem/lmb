if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Event = require("./models/event");
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
const dbURL = process.env.ATLAS_DB;

// Database connection
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
}

// Session store setup
const store = MongoStore.create({
  mongoUrl: dbURL,
  touchAfter: 24*3600,
  crypto: {
    secret: process.env.SECRET
  }
});

store.on("error", (err) => {
  console.log("ERROR in MongoDB Session", err);
});

// Session configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  }
};

// Session and authentication middleware
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/", userRoutes);
app.use("/", eventRoutes);

// Authentication status endpoint
app.get('/api/authstatus', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Start server
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});