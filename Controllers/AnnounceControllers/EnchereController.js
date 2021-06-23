const Enchere = require("../../model/Announce/Enchere.model");
const City = require("../../model/City.model");
const Subcateg = require("../../model/Subcategs.model");
const User = require("../../model/personne/User.model");
const jwt = require("jsonwebtoken");
const io = require('../../socket');

exports.addEnchere = async (req, res) => {
  try {
    const { subject, details, phone, end_Date, initial_price } = req.body;
    const image = req.file.path;
    const { city, subcategorie, user } = req.params;
    await City.findById(city);
    await User.findById(user);
    await Subcateg.findById(subcategorie);
    const enchere = new Enchere({
      subject,
      details,
      city,
      user,
      phone,
      image,
      subcategorie,
      end_Date,
      initial_price,
    });
    const saved = await enchere.save();
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
    res.status(400).json({ Error: err.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const enchers = await Enchere.find();
    res.status(200).json(enchers);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

exports.EnchereParticipation = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(req.body.user);
    user = await User.findByIdAndUpdate(req.body.user, {
      $set: { point: user.point - 10 },
    });
    const {
      _id,
      firstname,
      lastname,
      phone,
      image,
      email,
      grade,
      point,
      announces,
    } = user;
    const payload = {
      userId: _id,
      firstname,
      lastname,
      phone,
      image,
      email,
      point,
      announces,
      grade,
    };

    const token = await jwt.sign(payload, "enchere2020!", { expiresIn: 3600 });

    await Enchere.findByIdAndUpdate(id, {
      $push: { enchere_list: req.body },
    });

    const enchere = await Enchere.findById(id).populate("user");
    io.getIO().emit('posts/'+id, { action: 'update',
    enchere
  });
    res.status(200).json({enchere, token: "Bearer " + token, UserId: _id});
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
exports.UpDatedEnchere = async (req, res) => {
  const { id } = req.params;
  const updatedAnnonce = req.body;

  try {
    const Rst = await Enchere.findByIdAndUpdate(
      id,
      { $set: updatedAnnonce },
      { new: true }
    );
    if (Rst) {
      io.getIO().emit('posts', { action: 'update'
    });
      await res
        .status(200)
        .json({ message: "Enchere updated!", updatedAnnonce });
    } else {
      throw new Error("EnchereID undefined !");
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
