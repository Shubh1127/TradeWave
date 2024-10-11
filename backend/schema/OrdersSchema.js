const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  userId: { type: String, required: true }, // Ensure userId is defined
});

module.exports = { OrdersSchema };
