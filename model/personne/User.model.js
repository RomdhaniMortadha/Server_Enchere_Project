const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personne = require("./personne.model");
const user = new Schema({
  point: {
    type: Number,
    default: 0,
  },
  announces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Announce" }],
});

const User = personne.discriminator("User", user);
module.exports = User;
