const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personne = require("./personne.model");

const Admin = new Schema({});

const admin = personne.discriminator("Admin", Admin);

module.exports = admin;
