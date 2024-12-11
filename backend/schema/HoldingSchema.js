const { Schema, default: mongoose } = require("mongoose");

const HoldingsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    name: { type: String, required: true }, // Stock name
    qty: { type: Number, required: true, default: 0 }, // Total quantity held
    avgPrice: { type: Number, required: true, default: 0 }, // Average price of stock
    Price: { type: Number, required: true, default: 0 }, // Current price of stock
    PNL: { type: Number, default: 0 }, 
    netChange: { type: Number, default: 0 }, // Difference between LTP and previous close
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = { HoldingsSchema };
