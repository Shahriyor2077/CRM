const { addStage, getAllStages, getStageById, updateStage, deleteStage } = require("../controllers/stage.conroller")

const router=require("express").Router()


router.post("/", addStage)
router.get("/", getAllStages)
router.get("/id", getStageById)
router.put("/:id", updateStage)
router.delete("/:id", deleteStage)

module.exports=router;