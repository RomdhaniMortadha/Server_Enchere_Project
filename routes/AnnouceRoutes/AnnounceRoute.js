const router=require('express').Router()
const AnnonceController=require('../../Controllers/AnnounceControllers/AnnounceController')

router.get('/',AnnonceController.getAllAnnoucements)
router.delete('/:id',AnnonceController.deleteAnnounce)
router.get('/:id',AnnonceController.SearchByID)
router.get('/user/:id',AnnonceController.getuserannounces)
router.post('/update/:id',AnnonceController.UpDatedAnnounce)
module.exports=router