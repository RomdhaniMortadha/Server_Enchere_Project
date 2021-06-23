const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categ = new Schema({
  nom: { type: String, required: true },
  subcategs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcateg" }],
});

const Categ = mongoose.model("Categ", categ);
module.exports = Categ;
