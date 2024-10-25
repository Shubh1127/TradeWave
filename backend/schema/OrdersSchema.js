const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const OrdersSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String, default:uuidv4 }, // Ensure userId is defined
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

module.exports = { OrdersSchema };
