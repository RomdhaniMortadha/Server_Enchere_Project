const router=require("express").Router();
const PackController=require('../Controllers/PackSoldeController');

router.post('/add',PackController.addPack);
router.get('/',PackController.getAllPack);
router.get('/:id',PackController.getPackById);
router.put("/update/:id",PackController.UpdatePack);
router.delete("/delte/:id",PackController.deletePack);

module.exports=router;