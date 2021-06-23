const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const packSolde = new Schema({
  price: { type: Number, required: true },
  qtepoints: { type: Number, required: true },
});
var PackSolde = mongoose.model("PackSolde", packSolde);

module.exports = PackSolde;
