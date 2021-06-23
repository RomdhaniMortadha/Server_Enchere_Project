const router=require("express").Router();
const DrawController = require("../../Controllers/AnnounceControllers/DrawController");
const {isAuth}=require('../../middleware/auth');
const {upload}=require('../ImageService')

router.get('/',DrawController.getAll)
router.post('/add/:user/:subcategorie/:city',upload.single('image'),DrawController.addDraw)
router.post('/update/:id',DrawController.UpDatedDraw)
module.exports = router;
