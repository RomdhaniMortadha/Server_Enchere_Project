const router = require("express").Router();
const subgategscontroller = require("../Controllers/Subcategs.controller");

router.get("/", subgategscontroller.getAllSubcategs);
router.post("/add/:id", subgategscontroller.AddSubgategs);
router.get("/:id", subgategscontroller.RechercheSubcategById);
router.delete("/:id", subgategscontroller.deleteSubcategs);
router.post("/update/:id", subgategscontroller.UpdateSubcategs);

module.exports = router;
