const stripe = require("stripe")(
  "sk_test_51IO6fDH5zvaLv3PtKcrnUWUesmzWae2tHV71KA6WYetWfS6wb7UBzdH8YnIWs4z3jHhPeoqgd2YjybrbegA4qdXL00HUDp5MY0"
);
const User = require("../model/personne/User.model");
const jwt = require("jsonwebtoken");
exports.addpayment = async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id, userId, point } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const user = await User.findById(userId);
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    user.point = +user.point + point;
    await user.save();
    const { _id, firstname, lastname, phone, email} = user;
    const payload = {
      userId: _id,
      firstname,
      lastname,
      phone,
      point:user.point,
      image: user.image,
      email,
      grade: "user",
    };
    const token = await jwt.sign(payload, "enchere2020!", {
      expiresIn: 3600,
    });
    console.log(user);
    res.json({
      message: "Payment Successful",
      success: true,
      token: "Bearer " + token,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};
