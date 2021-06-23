const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcateg = new Schema({
  nom: { type: String, required: true },
  announces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Announce" }],
});

const Subcateg = mongoose.model("Subcateg", subcateg);
module.exports = Subcateg;
