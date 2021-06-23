const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Announce = new Schema(
  {
    subject: { type: String, trim: true, required: true },
    details: { type: String, trim: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City",  },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    phone: { type: String, required: true },
    image: { type: String},
    isVlable:{type:Boolean,default:true},
    subcategorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcateg",
      
    },
  },
  {
    timestamps: true,
  }
);
var announce = mongoose.model("Announce", Announce);

module.exports = announce;
