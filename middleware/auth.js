const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decode = jwt.verify(token, "enchere2020!");
    if (!decode) {
      return res
        .status(401)
        .json({ message: "vous etes pas autorisé pour cette opération" });
    }
    console.log(decode,"isauth")
    req.personData = decode;

    next();
  } catch (err) {
    res
      .status(401)
      .json({ err: new Error("vous etes pas autorisé pour cette opération") });
  }
};
