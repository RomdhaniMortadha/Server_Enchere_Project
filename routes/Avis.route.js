const router = require("express").Router();
const aviscontroller = require("../Controllers/Avis.controller");
router.get("/", aviscontroller.getAllAvis);
router.post("/add", aviscontroller.AddAvis);
router.delete("/:id", aviscontroller.deleteAvis);
module.exports = router;
