const router = require("express").Router();
const UserController = require("../Controllers/UserController");
const { isAuth } = require("../middleware/auth");
const {upload}=require('./ImageService')

router.get("/", UserController.getAllUsers);
router.post("/add", upload.single('image'),UserController.signup);
router.get("/:id", UserController.FindUserById);
router.put("/update", isAuth,upload.single('image'),UserController.UpDateUser);
router.delete("/:id", UserController.deleteUser);
router.post('/addEnchere',UserController.AddEnchere)
module.exports = router;
