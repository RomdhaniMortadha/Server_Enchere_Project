const User = require("../model/personne/User.model");
const personnne = require("../model/personne/personne.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");
const Enchere=require("../model/Announce/Enchere.model")

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tunis.enchere@gmail.com",
    pass: "encheretekup!",
  },
});

exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json({ Users });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      email,
      password,
      point,
      image,
      announces,
    } = req.body;
   
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      return res.status(404).json({ message: "email déja existe" });
    }
    const hashedpw = await bcrypt.hash(password, 12);
    if (hashedpw) {

      const user = new User({
        firstname: firstname,
        lastname: lastname,
        phone: Number(phone),
        image: image,
        email: email,
        password: hashedpw,
        grade: "user",
        point: point,
        announces: announces,
      });
      const addedUser = await user.save();

      res.status(200).json({ message: "User created", userId: addedUser._id });
      transporter.sendMail(
        {
          from: "enchere tunise",
          to: email,
          subject: "Bienvenue sur Enchere",
          text: "Bonjour " + firstname + " Bienvenue sur Enchere-Tunise,Votre nouveau compte vous donne accès aux produits, applications et services Enchére Tunise.",
        },
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    } else {
      return res.status(400).json({ message: "mot de passe pas hashé" });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
    
  }
};

exports.FindUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.UpDateUser = async (req, res) => {
   
  
  const { userId } = req.personData;
  
  try {
    let user=await  User.findById(userId)
    const image=req.file?req.file.path : user.image
     user = await User.findByIdAndUpdate(
      userId,
      { $set: req.body,image },
      { new: true }
    );
    const { _id, firstname, lastname,phone,   email ,point} = user;
    const payload = {
      userId: _id,
      firstname,
      point,
      lastname,
      phone,
      image:user.image,
      email,
      grade: "user",
    };
    const token = await jwt.sign(payload, "enchere2020!", {
      expiresIn: 3600,
    });
    res.status(200).json({
      message: "User updated!",
      token: "Bearer " + token,
      UserId: _id,
    });   
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userdel = await personnne.findByIdAndDelete(userId);
    if (userdel) res.status(200).json({ message: "user deleted." });
    else {
      return res
        .status(401)
        .json({ message: `user with id ${userid} not existe ` });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};


exports.AddEnchere=async(req,res)=>{

  try{
    const amount=req.body.amount
    const userId=req.personData
    const enchereId=req.param.enchereId
    const user=await User.findById(userId)
  const announce=await Enchere.findById(enchereId)
  if (user.point <5){
 throw new Error("cannot add Enchére with point under 5 point")
  }
  user.point=user.point-5;
  await user.save()
  const existingUserID =announce.enchere_list.findIndex((item) => item.id === userId);
  const existingCartItem = state.items[existingCartItemIndex];
  let updatedItems;
  announce.enchere_list=announce.enchere_list.unshift(userId)
  announce.price=announce.price+amount
  const annonce=await announce.save();
 
  
  return res.status(200).json({message:"enchere added ",annonce})
  } catch (err) {
    res.status(400).json(err.message)
  }
  
  }