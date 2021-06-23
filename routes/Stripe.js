const stripecontroller=require('../Controllers/Stripe.Controller');
const router=require('express').Router();
const cors = require("cors");

router.post("/charge",cors(),stripecontroller.addpayment);

module.exports = router;
