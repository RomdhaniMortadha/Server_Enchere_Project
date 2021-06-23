const Draw = require("../../model/Announce/Draw.model");
const City = require("../../model/City.model");
const Subcateg = require("../../model/Subcategs.model");
const User = require("../../model/personne/User.model");
const io = require('../../socket');
exports.addDraw = async (req, res) => {
  try {
    const {
      subject,
      details,
      phone,
      max_participants_number,
      participation_price,
    } = req.body;
    const image = req.file.path;
    const { city, subcategorie, user } = req.params;

    await City.findById(city);
    await User.findById(user);
    await Subcateg.findById(subcategorie);
    const draw = new Draw({
      subject,
      details,
      city,
      user,
      phone,
      image,
      subcategorie,
      max_participants_number,
      participation_price,
    });
    const saved = await draw.save();
    await Subcateg.findByIdAndUpdate(subcategorie, {
      $push: { announces: saved._id },
    });
    await User.findByIdAndUpdate(user, {
      $push: { announces: saved._id },
    });
    io.getIO().emit('posts', { action: 'create',
      saved
    });
    res.status(200).json(saved);
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ Error: err.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const draws = await Draw.find();
    res.status(200).json(draws);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
exports.UpDatedDraw = async (req, res) => {
  const { id } = req.params;
  const updatedAnnonce = req.body;

  try {
    const Rst = await Draw.findByIdAndUpdate(
      id,
      { $set: updatedAnnonce },
      { new: true }
    );
    if (Rst) {
      io.getIO().emit('posts', { action: 'update',
      saved
    });
      await res.status(200).json({ message: "Draw updated!", updatedAnnonce });
    } else {
      throw new Error("DrawID undefined !");
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
