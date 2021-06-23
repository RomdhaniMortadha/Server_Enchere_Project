const Categ = require("../model/Categori.model");
const Subcateg = require("../model/Subcategs.model");

exports.AddSubgategs = async (req, res) => {
  const { nom } = req.body;
  const newsubcateg = new Subcateg({ nom });

  try {
    const categ = await Categ.findById(req.params.id);
    if (categ) {
      const addedSubCateg = await newsubcateg.save();
      await Categ.findByIdAndUpdate(req.params.id, {
        $push: { subcategs: addedSubCateg._id },
      });
    }
    res.status(200).json("Subcategs Added");
  } catch (err) {
    res.status(400).json("Error:" + err);
  }
};

exports.getAllSubcategs = async (req, res) => {
  try {
    const subcategs = await Subcateg.find();
    res.status(200).json(subcategs);
  } catch (err) {
    res.status(400).json("Eerror" + err);
  }
};

exports.RechercheSubcategById = async (req, res) => {
  try {
    const subcategories = await Subcateg.findById(req.params.id).populate('announces');
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

exports.deleteSubcategs = async (req, res) => {
  try {
    const Rst = await Subcateg.findByIdAndDelete(req.params.id);
    if (Rst) {
      res.status(200).json("Subcategs Deleted");
    } else {
      throw new Error("Subcategs Undefined ");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

exports.UpdateSubcategs = async (req, res) => {
  const subcategsUpdat = req.body;
  try {
    const Rst = await Subcateg.findByIdAndUpdate(
      req.params.id,
      { $set: subcategsUpdat },
      { new: true }
    );
    if (Rst) {
      res.status(200).json({message:"Subcategorie Updated" , subcategorie:Rst});
    } else {
      throw new Error("Subcategorie Undefined ");
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};
