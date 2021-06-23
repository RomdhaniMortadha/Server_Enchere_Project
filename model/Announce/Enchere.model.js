const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const announce = require("./Announce.model");

var Enchere = new Schema({
  end_Date: { type: Date, require: true, trim: true },
  initial_price: { type: Number, required: true },
  price: { type: Number},
  enchere_list: [
    {
      price: { type: Number },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});
var enchere = announce.discriminator("Enchere", Enchere);
module.exports = enchere;
