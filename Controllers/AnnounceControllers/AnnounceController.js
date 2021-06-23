const Announce = require("../../model/Announce/Announce.model")
const personne = require("../../model/personne/personne.model")
const item_inpage=12;
exports.getuserannounces=async (req,res) =>{
    try{
      const user=await personne.findById(req.params.id).populate({
        path: 'announces',
        populate: { path: 'user' }
      });
      res.status(200).json(user.announces)

    }catch(err){
        res.status(400).json({Error:err.message})
    }
  }
exports.getAllAnnoucements=async (req,res) =>{
  const page=+req.query.page;

    try {

        const announcesCount= (await Announce.find()).length

        const announces=await Announce.find()
        .sort({createdAt:-1}).populate("user")
        .skip((page-1)*item_inpage)
        .limit(item_inpage)

        res.status(200).json({announces,announcesCount:Math.ceil(announcesCount/item_inpage) })

    } catch(err){
        res.status(400).json({Error:err.message})
    }
}

exports.deleteAnnounce =async (req,res)=>{
    try{
        const rst=await Announce.findByIdAndDelete(req.params.id)
        if(rst)
        res.status(200).json("Annouce deleted!")
        else throw new Error('ID not found')
    }catch(err){
        res.status(400).json({Error :err.message})
    }
}   
exports.SearchByID = async (req, res) => {
    try {
      const announce = await Announce.findById(req.params.id).populate("user");
      res.status(200).json({ announce });
    } catch (err) {
      res.status(400).json(err);
    }
  };
  exports.UpDatedAnnounce = async (req, res) => {
    const { id } = req.params;
    const updatedAnnonce = req.body;
  
    try {
      const Rst = await Announce.findByIdAndUpdate(
        id,
        { $set: updatedAnnonce },
        { new: true }
      );
      if (Rst) {
        await res
          .status(200)
          .json({ message: "Annonce updated!", updatedAnnonce });
      } else {
        throw new Error("announceID undefined !");
      }
    } catch (err) {
      res.status(400).json({ Error: err.message });
    }
  };