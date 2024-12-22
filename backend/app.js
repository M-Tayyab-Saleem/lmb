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

// Basic middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://bookify-xi.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).send();
  }
  next();
});

const port = process.env.PORT;
const dbURL = process.env.ATLAS_DB;

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
}

const store = MongoStore.create({
  mongoUrl: dbURL,
  touchAfter: 24*3600,
  crypto: {
    secret: process.env.SECRET
  }
});

store.on("error" , ()=>{
  console.log("ERROR in MongoDB Session", err);
});

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

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Event Routes
app.use("/" , eventRoutes);

//User Routes
app.use("/" , userRoutes);

//Authentication Path
app.get('/api/authstatus', (req, res) => {
  if (req.isAuthenticated()) {
      res.status(200).json({ isAuthenticated: true });
  } else {
      res.status(200).json({ isAuthenticated: false });
  }
});

app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});