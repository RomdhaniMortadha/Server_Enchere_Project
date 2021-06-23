const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const announce = require("./Announce.model");

var Draw = new Schema({
  max_participants_number: { type: Number, required: true },
  participation_price: { type: Number, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
var draw = announce.discriminator("Draw", Draw);
module.exports = draw;
