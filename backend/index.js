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

const data = require('./data');

// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');

const { HoldingsModel } = require('./model/HoldingsModel');
const {HoldingSchema}=require('./schema/HoldingSchema')
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
  app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: "User already registered" });
      }
      const newUser = new User({
        email,
        username,
      });
      const registeredUser = await User.register(newUser, password);
      res.status(201).json({ message: "User registered successfully", user: registeredUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during signup" });
    }
  });
  app.post("/login", async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ message: 'Username does not match. Go to Sign up.' });
      }
      passport.authenticate('local', (err, authenticatedUser, info) => {
        if (err) {
          console.error('Error during authentication:', err);
          return res.status(500).json({ message: 'An error occurred during login' });
        }
        if (!authenticatedUser) {
          return res.status(401).json({ message: 'Password not matched' });
        }
        req.logIn(authenticatedUser, (err) => {
          if (err) {
            console.error('Login failed:', err);
            return res.status(500).json({ message: 'Login failed' });
          }
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
        const formattedData = `const stockData = ${JSON.stringify(stockData, null, 2)};\n\nmodule.exports = stockData;`;
        fs.writeFile('./data.js', formattedData, (err) => {
          if (err) {
              console.error('Error writing to data.js:', err);
          } else {
              console.log('Data successfully saved to data.js');
          }
      });
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
// fetchAndSaveData();
app.get('/api/stocks', (req, res) => {
  res.json(stockData); 
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
app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).send("Error fetching holdings");
  }
});
app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).send("Error fetching positions");
  }
});
app.post("/buystock", async (req, res) => {
  const { userId, name, qty, price } = req.body;
  try {
    const quantity = Number(qty); 
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }
    const previousClose = await getPreviousClose(name);
    if (previousClose === null) {
      return res.status(400).json({ message: `Previous close data not found for ${name}` });
    }
    // Calculate netChange as LTP - previous close
    const netChange = price - previousClose;
    let holding = await HoldingsModel.findOne({ userId, name });
    if (holding) {
      const totalCost = (holding.avgPrice * holding.qty) + (price * quantity); 
      const newQty = holding.qty + quantity; 
      const newAvgPrice = totalCost / newQty; 
      const newPrice = price;

      holding.qty = newQty;
      holding.avgPrice = newAvgPrice; 
      holding.Price = newPrice;
      holding.netChange = netChange;
      holding.updatedAt = new Date(); 
      await holding.save();
    } else {
      const newHolding = new HoldingsModel({
        userId,
        name,
        qty: quantity, 
        avgPrice: price,
        Price: price,
        netChange: netChange,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newHolding.save();
    }
    const newOrder = new OrdersModel({
      userId,
      name,
      qty: quantity,
      price,
      mode: "BUY",
    });
    await newOrder.save();
    return res.status(200).json({ message: "Stock bought successfully!" });
  } catch (error) {
    console.error("Error buying stock:", error);
    return res.status(500).json({ message: "Failed to buy stock", error });
  }
});
async function getPreviousClose(stockName) {
  const stock = data.find(item => item.symbol === stockName);
  if (stock) {
    const dateList = Object.keys(stock.data['Time Series (Daily)']);
    const previousDate = dateList[1]; 
    if (previousDate) {
      const value=parseFloat(stock.data['Time Series (Daily)'][previousDate]['4. close']); 
      return value;
    } else {
      console.log(`No previous closing price found for stock ${stockName}`);
      return null;
    }
  } else {
    console.log(`Stock ${stockName} not found in data`);
    return null; 
  }
}
app.get("/holdings", async (req, res) => {
  const userId = req.query.userId;
  try {
    await HoldingsModel.updatePNL();
    const holdings = await HoldingsModel.find({ userId });
    const holdingsWithCalculatedValues = await Promise.all(
      holdings.map(async (holding) => {
        const { name, qty, avgPrice, Price, netChange, PNL } = holding;
        const currentValue = qty * Price;
        const netChangePercentage =
          netChange !== undefined && Price !== 0
            ? ((netChange / Price ) * 100).toFixed(2)
            : "N/A";
        return {
          name,
          qty,
          avgCost: avgPrice,
          ltp: Price,
          currentValue,
          pnl:PNL*qty,
          netChange: netChangePercentage,
        };
      })
    );

    return res.status(200).json(holdingsWithCalculatedValues);
  } catch (error) {
    console.error("Error fetching holdings:", error);
    return res.status(500).json({ message: "Failed to fetch holdings", error });
  }
});



 

app.post("/sellstock", async (req, res) => {
  const { userId, name, qty, price } = req.body;

  try {
    const holding = await HoldingsModel.findOne({ userId, name });

    if (!holding || holding.qty < qty) {
      return res.status(400).json({
        message: "Insufficient quantity to sell.",
      });
    }

    // Create new sell order
    const newOrder = new OrdersModel({
      userId,
      name,
      qty,
      price,
      mode: "SELL",
    });

    await newOrder.save(); 

    // Update the holding quantity
    holding.qty -= qty;
    holding.netWorth = holding.qty * holding.avgPrice;

    if (holding.qty === 0) {
      // Use deleteOne() instead of remove()
      await holding.deleteOne();
    } else {
      await holding.save();
    }

    return res.status(200).json({
      message: "Stock sold successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error selling stock:", error);
    return res.status(500).json({ message: "Failed to sell stock", error });
  }
});


app.get("/allorders", async (req, res) => {
  const userId = req.query.userId;
  try {
    let allOrders;
    if (userId) {
      allOrders = await OrdersModel.find({ userId })
        .populate('userId')
        .sort({ createdAt: -1 }); // Sort by createdAt, latest first
    } else {
      allOrders = await OrdersModel.find({})
        .populate('userId')
        .sort({ createdAt: -1 }); // Sort by createdAt, latest first
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
    let BuyOrders = await OrdersModel.find({ mode: 'BUY' }).populate('userId');
    if (!BuyOrders || BuyOrders.length === 0) {
      return res.status(404).json({ message: 'No buy orders found' });
    }
    return res.status(200).json(BuyOrders);
  } catch (err) {
    console.error("Error fetching buy orders:", err);
    return res.status(500).json({ message: 'Server error' });
  }
});
app.listen(port, () => {
  console.log("Server started at port:", port);
});
