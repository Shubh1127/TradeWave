const { model } = require("mongoose");

const { HoldingsSchema } = require("../schema/HoldingSchema");

const HoldingsModel = new model("holding", HoldingsSchema);

module.exports = { HoldingsModel };