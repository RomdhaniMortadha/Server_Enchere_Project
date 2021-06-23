const router = require("express").Router();
const EnchereController = require("../../Controllers/AnnounceControllers/EnchereController");
const {isAuth}=require('../../middleware/auth');
const {upload}=require('../ImageService')
router.post('/add/:user/:subcategorie/:city',upload.single('image'),EnchereController.addEnchere)
router.get('/',EnchereController.getAll)
router.post('/update/:id',EnchereController.UpDatedEnchere)
router.post('/participate/:id',EnchereController.EnchereParticipation)


module.exports = router;
