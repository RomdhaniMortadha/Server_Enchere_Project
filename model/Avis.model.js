const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avis = new Schema({
  email: { type: String, required: true },
  detail: { type: String, required: true },
},
{
  timestamps: true,
});

const Avis = mongoose.model("Avis", avis);
module.exports = Avis;
