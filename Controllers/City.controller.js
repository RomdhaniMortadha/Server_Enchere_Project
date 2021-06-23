const City = require("../model/City.model");

exports.AddCity = async (req, res) => {
  const { nom } = req.body;
  const newcity = new City({ nom });

  try {
    await newcity.save();
    res.status(200).json("City Added");
  } catch (err) {
    res.status(400).json("Error:" + err);
  }
};

exports.getAllCity = async (req, res) => {
  try {
    const citye = await City.find();
    res.status(200).json(citye);
  } catch (err) {
    res.status(400).json("Eerror" + err);
  }
};

exports.RechercheCityById = async (req, res) => {
  try {
    const cityes = await City.findById(req.params.id);
    res.status(200).json(cityes);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const Rst = await City.findByIdAndDelete(req.params.id);
    if (Rst) {
      res.status(200).json("City Deleted");
    } else {
      throw new Error("City Undefined ");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};
