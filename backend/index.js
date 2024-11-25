require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport=require("passport")
const LocalStrategy= require("passport-local")
const session=require('express-session')
const User=require('./model/userModel')
const request = require('request');
const fs = require('fs');

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
  done(null, user._id); // Here you save the user ID in the session
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

// Connect to MongoDBf
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
  
 
  
  app.post("/login", async (req, res, next) => {
    try {
      // Find the user by username
      const user = await User.findOne({ username: req.body.username });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'Username does not match. Go to Sign up.' });
      }
  
      // Authenticate using Passport
      passport.authenticate('local', (err, authenticatedUser, info) => {
        if (err) {
          console.error('Error during authentication:', err);
          return res.status(500).json({ message: 'An error occurred during login' });
        }
        if (!authenticatedUser) {
          return res.status(401).json({ message: 'Password not matched' });
        }
  
        // Log in the user
        req.logIn(authenticatedUser, (err) => {
          if (err) {
            console.error('Login failed:', err);
            return res.status(500).json({ message: 'Login failed' });
          }
  
          // Send a successful login response
          return res.status(200).json({ message: 'Login successful', user: authenticatedUser });
        });
      })(req, res, next);
  
    } catch (err) {
      console.error("Error in login route:", err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
const companies = ['IBM', 'AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NFLX', 'META', 'NVDA', 'JPM'];

const stockData = [];
async function fetchAndSaveData() {
    try {

        for (const symbol of companies) {
            await new Promise((resolve, reject) => {
                const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

                request.get({ url: apiUrl, json: true }, (err, response, data) => {
                    if (err) {
                        console.error(`Error fetching data for ${symbol}:`, err);
                        reject(err);
                    } else if (response.statusCode !== 200) {
                        console.error(`API error for ${symbol}:`, response.statusCode);
                        reject(new Error('API error'));
                    } else {
                        stockData.push({ symbol, data });
                        resolve();
                    }
                });
            });
        }

        // Write data to data.js
        const formattedData = `const stockData = ${JSON.stringify(stockData, null, 2)};\n\nmodule.exports = stockData;`;

        fs.writeFile('../dashboard/src/data/data.js', formattedData, (err) => {
            if (err) {
                console.error('Error writing to data.js:', err);
            } else {
                console.log('Data successfully saved to data.js');
            }
        });
    } catch (err) {
        console.error('Failed to fetch or save data:', err);
    }
}

fetchAndSaveData();
app.get('/api/stocks', (req, res) => {
  res.json(stockData); // Send stock data as JSON
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
  try {
    const { userId, name, qty, price, mode } = req.body;

    // Create a new order
    const newOrder = new OrdersModel({ userId, name, qty, price, mode });
    await newOrder.save();

    // Find the user and push the order ID to their orders array
    const userUpdateResult = await User.findByIdAndUpdate(
      userId,
      { $push: { orders: newOrder._id } }, // Ensure this matches your user schema
      { new: true, useFindAndModify: false } // This option returns the updated document
    );

    // console.log("User update result:", userUpdateResult); // Log to check the result

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
});





app.get("/allorders", async (req, res) => {
  const  userId  = req.query.userId;
  // console.log(userId) // Extract userId from the query parameters

  try {
    // const ordersWithBothMode=await OrdersModel.aggregate([
    //   {
    //     $group:{
    //       _id:{userId:"$userId",name:"$name"},
    //       modes:{$addToSet:"$mode"},
    //       orders:{$push:"$$ROOT"}
    //     },
    //   },
    //   {
    //     $match:{
    //       modes:{$all:["BUY","SELL"]},
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       userId: "$_id.userId",
    //       name: "$_id.name",
    //     },
    //   },
    // ])
    // const deletionCriteria=ordersWithBothMode.map((order)=>({
    //   userId:order.userId,
    //   name:order.name,
    // }))
    // let deletedOrder=await OrdersModel.deleteMany({
    //   $or:deletionCriteria,
    // })
    let allOrders;
      // If userId is provided, fetch orders specific to that user
      if (userId) {
        allOrders = await OrdersModel.find({ userId }).populate('userId');
      } else {
        // Fetch all orders if no userId is provided (optional)
        allOrders = await OrdersModel.find({}).populate('userId');
      }
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
