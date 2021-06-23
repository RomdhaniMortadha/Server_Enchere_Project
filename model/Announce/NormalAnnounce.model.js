const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const announce = require("./Announce.model");

var Normal_Announce = new Schema({
  price: { type: Number, required: true },
});
var normal = announce.discriminator("Normal_Announce", Normal_Announce);
module.exports = normal;
