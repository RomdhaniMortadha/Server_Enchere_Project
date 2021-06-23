const router = require("express").Router();
const LoginController = require("../Controllers/LoginController");

router.post("/login", LoginController.login);

module.exports = router;
