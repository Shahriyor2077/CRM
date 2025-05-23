const { addLidStatus, getAllLidStatus, getLidStatusById, updateLidStatus, deleteLidStatus } = require("../controllers/lidStatus.controller")

const router=require("express").Router()

router.post("/", addLidStatus),
router.get("/", getAllLidStatus),
router.get("/:id", getLidStatusById),
router.put("/:id", updateLidStatus),
router.delete("/:id", deleteLidStatus)

module.exports=router