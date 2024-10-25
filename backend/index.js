require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport=require("passport")
const LocalStrategy= require("passport-local")
const session=require('express-session')
const User=require('./model/userModel')
// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');

const { HoldingsModel } = require('./model/HoldingsModel');
const { OrdersModel } = require('./model/OrdersModel');
const port = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const app = express();

app.use(cors());
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true, 
}));
app.use(bodyParser.json());

const sessionOptions={
  secret:"mysecretcode",
    resave:false,
    saveUninitialized: false,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'lax',
        secure:false,
    }
}

app.use(session(sessionOptions))
app.use(passport.initialize())
passport.use(new LocalStrategy(User.authenticate()))
app.use(passport.session())



passport.serializeUser((user, done) => {
  done(null, user.id); // Here you save the user ID in the session
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Retrieve the user from the database
    done(null, user); // Attach user to req.user
  } catch (err) {
    done(err);
  }
});

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'IoXqLZFvPyHgPcbU4iNdBptz9QraYLt9',
//   issuerBaseURL: 'https://dev-a5b3ioc2bbcsnbu6.us.auth0.com'
// };
// app.use(auth(config));

// Connect to MongoDB
mongoose.connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Problem in connecting to the Database", err));


  // app.get('/', (req, res) => {
  //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // });


// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });


  app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already registered" });
      }
  
      // Create a new user
      const newUser = new User({
        email,
        username,
      });
  
      // Register the new user
      const registeredUser = await User.register(newUser, password);

      res.status(201).json({ message: "User registered successfully", user: registeredUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during signup" });
    }
  });
  
 
  
  app.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'An error occurred during login' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login failed:', err);
          return res.status(500).json({ message: 'Login failed' });
        }
        console.log(req.user.username)
        // Send a successful login response
        return res.status(200).json({ message: 'Login successful', user: user });
      });
    })(req, res, next);
  });
  app.get('/login',(req,res)=>{
    try{
      if(!req.isAuthenticated()){
        return res.status(500).json({message:"User is not logged in"})
      }else{
        const user=req.user;  
        res.status(200).json({message:"user is logged in",user:user})
        console.log("Authenticated user:",req.body)
      }
    }catch(error){
      console.error(error)
    }
    
  })
 


app.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err)
    }
    req.session.destroy(()=>{
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  })
})






// Fetch all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).send("Error fetching holdings");
  }
});

// Fetch all positions
app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).send("Error fetching positions");
  }
});

// New order route
app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode, userId } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).send("Stock name is required");
  }
  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  // Create a new order instance
  const newOrder = new OrdersModel({ name, qty, price, mode, userId });

  try {
    // Save the new order to the database
    await newOrder.save();

    // Optionally populate the user data for the response
    const populatedOrder = await OrdersModel.findById(newOrder._id).populate('userId');

    res.status(201).json({
      message: "Order saved!",
      order: populatedOrder // Send back the populated order data
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Error saving order");
  }
});





app.get("/allorders", async (req, res) => {
  try {
    // Fetch all orders and populate the userId field with user details
    let allOrders = await OrdersModel.find({}).populate('userId');

    // Return the orders with user data
    res.json(allOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Error fetching orders");
  }
});
app.get("/sellstock", async (req, res) => {
  try {
    // Fetch all buy orders and populate the userId field with user details
    let BuyOrders = await OrdersModel.find({ mode: 'BUY' }).populate('userId');

    // Check if there are no buy orders
    if (!BuyOrders || BuyOrders.length === 0) {
      return res.status(404).json({ message: 'No buy orders found' });
    }

    // Return the found buy orders with user details
    return res.status(200).json(BuyOrders);
  } catch (err) {
    console.error("Error fetching buy orders:", err);
    return res.status(500).json({ message: 'Server error' }); // Send a server error response
  }
});



app.listen(port, () => {
  console.log("Server started at port:", port);
});
