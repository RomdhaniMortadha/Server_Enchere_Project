const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personneSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    phone: {
      type: String,
      required: true,
      minlength: 8,
    },
    image: { type: String },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      unique:true,
      required: true,
     
    },
    grade: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);
const personne = mongoose.model("Personne", personneSchema);
module.exports = personne;
