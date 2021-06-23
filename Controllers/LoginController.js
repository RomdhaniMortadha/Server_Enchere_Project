const User = require("../model/personne/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/personne/Admin.model");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(401).json({ message: "vous avez pas un compte!" });
      } else {
        const verifepass = await bcrypt.compare(password, admin.password);
        if (verifepass) {
          const {
            _id,
            firstname,
            lastname,
            phone,
            image,
            email,
            password,
            grade,
          } = admin;
          const payload_ad = {
            adminId: _id,
            firstname,
            lastname,
            phone,
            image,
            email,
            grade,
          };
          const tokenAdmin = await jwt.sign(payload_ad, "enchere2020!", {
            expiresIn: 3600,
          });
          if (tokenAdmin) {
            res
              .status(200)
              .json({ success: true, token: "Bearer " + tokenAdmin });
          }
        } else {
          return res.status(400).json({ message: "mot de passe incorrect" });
        }
      }
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
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

        if (token) {
          res
            .status(200)
            .json({ success: true, token: "Bearer " + token, UserId: _id });
        }
      } else {
        return res.status(400).json({ message: "mot de passe incorrect" });
      }
    }
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ Error: err.message });
    
  }
};
