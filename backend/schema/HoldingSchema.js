const { Schema, default: mongoose } = require("mongoose");

const HoldingsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    name: { type: String, required: true }, // Stock name
    qty: { type: Number, required: true, default: 0 }, // Total quantity held
    avgPrice: { type: Number, required: true, default: 0 }, // Average price of stock
    netWorth: { type: Number, default: 0 }, // Computed: qty * avgPrice
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = { HoldingsSchema };