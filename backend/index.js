require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { HoldingsModel } = require('./model/HoldingsModel');
const { OrdersModel } = require('./model/OrdersModel');
const port = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Problem in connecting to the Database", err));

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

  // console.log("Name received:", name);  // Add this line to check if `name` is received
  if (!name) {
    return res.status(400).send("Stock name is required");
  }

  

  const newOrder = new OrdersModel({ name, qty, price, mode, userId });

  try {
    await newOrder.save();
    res.send("Order saved!");
    // console.log(newOrder)
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Error saving order");
  }
});



// New route to fetch orders for a specific user
app.get("/orders/:userId", async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (err) {
    res.status(500).send("Error fetching holdings");
  }
});


app.listen(port, () => {
  console.log("Server started at port:", port);
});
