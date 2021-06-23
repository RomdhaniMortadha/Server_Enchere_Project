const router = require("express").Router();
const Citycontroller = require("../Controllers/City.controller");
router.get("/", Citycontroller.getAllCity);
router.post("/add", Citycontroller.AddCity);
router.get("/:id", Citycontroller.RechercheCityById);
router.delete("/:id", Citycontroller.deleteCity);
module.exports = router;
