const Categ = require("../model/Categori.model");

exports.AddCategori = async (req, res) => {
  const { nom } = req.body;
  const newcateg = new Categ({ nom });

  try {
    await newcateg.save();
    res.status(200).json("Categorie Added");
  } catch (err) {
    res.status(400).json("Error:" + err);
  }
};

exports.getAllCategori = async (req, res) => {
  try {
    const categs = await Categ.find().populate("subcategs");
    res.status(200).json(categs);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

exports.RechercheCategById = async (req, res) => {
  try {
    const categories = await Categ.findById(req.params.id);
    console.log(categories)
    if(!categories){
    return res.status(400).json({message:"categorie with this ID not found"});
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json("Error" + err.message);
  }
};
exports.deleteCategorie = async (req, res) => {
  try {
    const Rst = await Categ.findByIdAndDelete(req.params.id);
    if (Rst) {
      res.status(200).json("Categorie Deleted");
    } else {
      throw new Error("Categorie Undefined ");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

exports.UpdateCategorie = async (req, res) => {
  const categsUpdat = req.body;
  try {
    const Rst = await Categ.findByIdAndUpdate(
      req.params.id,
      { $set: categsUpdat },
      { new: true }
    );
    if (Rst) {
      res.status(200).json({message:"Categorie Updated"  ,categories:Rst});
    } else {
      throw new Error("Categorie Undefined ");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};
