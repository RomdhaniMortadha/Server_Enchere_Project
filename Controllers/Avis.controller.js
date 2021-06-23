const Avis = require("../model/Avis.model");

exports.AddAvis = async (req, res) => {
  const { email, detail } = req.body;
  const newavis = new Avis({ email, detail });

  try {
    const saved = await newavis.save();
    res.status(200).json("Avis Added ");
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

exports.getAllAvis = async (req, res) => {
  try {
    const aviss = await Avis.find();
    res.status(200).json(aviss);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

exports.deleteAvis = async (req, res) => {
  try {
    const Rst = await Avis.findByIdAndDelete(req.params.id);
    if (Rst) {
      res.status(200).json("Avis Deleted");
    } else {
      throw new Error("Avis Undefined ");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};
