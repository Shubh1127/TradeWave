const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const OrdersSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    orderId: { type: String, default: uuidv4 }, 
    name: { type: String, required: true }, 
    qty: { type: Number, required: true }, 
    price: { type: Number, required: true }, 
    mode: { type: String, enum: ["BUY", "SELL"], required: true }, 
    total: { type: Number, default: function () { return this.qty * this.price; } }, 
  },
  { timestamps: true } 
);

module.exports = { OrdersSchema };
