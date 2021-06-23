const router = require("express").Router();
const categoricontroller = require("../Controllers/Categori.controller");

router.get("/", categoricontroller.getAllCategori);
router.post("/add", categoricontroller.AddCategori);
router.get("/:id", categoricontroller.RechercheCategById);
router.delete("/:id", categoricontroller.deleteCategorie);
router.post("/update/:id", categoricontroller.UpdateCategorie);
module.exports = router;
