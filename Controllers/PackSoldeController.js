const Pack = require("../model/PackSolde.model");

exports.getAllPack = async (req, res) => {
  try {
    const Packs = await Pack.find();
    res.status(200).json(Packs);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.addPack = async (req, res) => {
  try {
    const { price, qtepoints } = req.body;
    const newpack = new Pack({
      price: price,
      qtepoints: qtepoints,
    });
    const pack = await newpack.save();
    if (!pack) {
      throw new Error("cannot added packsold ");
    }
    return res.status(200).json({ message: "Pack solde added ", pack: pack });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
exports.deletePack = async (req, res) => {
  const { id } = req.params;
  try {
    const Rst = await Pack.findByIdAndDelete(id);
    if (!Rst) {
      res.status(400).json("Error: " + err);
    }
    res.status(200).json("Pack deleted ");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};
exports.getPackById = async (req, res) => {
  try {
    const packs = await Pack.findById(req.params.id);
    res.json(packs);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};
exports.UpdatePack = async (req, res) => {
  const { id } = req.params;
  const updatePack = req.body;
  try {
    const packs = await Pack.findByIdAndUpdate(
      id,
      { $set: updatePack },
      { new: true }
    );
    return res.status(200).json({
      message: "Pack updated!",
      New_pack: packs,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
