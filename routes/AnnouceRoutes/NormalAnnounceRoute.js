const router=require("express").Router();
const {isAuth}=require('../../middleware/auth');
const {upload}=require('../ImageService')

const NormalAnnounceCont = require("../../Controllers/AnnounceControllers/NormalAnnounceController");
router.get('/',NormalAnnounceCont.getAll)
router.post('/add/:user/:subcategorie/:city',upload.single('image'),NormalAnnounceCont.addAnnounce)
router.post('/update/:id',NormalAnnounceCont.UpDatedNormalAnnounce)
module.exports = router;
