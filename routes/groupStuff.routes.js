const { addGroupStuff, getAllGroupStuff, getGroupStuffById, updateGroupStuff, deleteGroupStuff } = require("../controllers/groupStuff");

const router=require("express").Router();


router.post("/", addGroupStuff),
router.get("/", getAllGroupStuff),
router.get("/:id", getGroupStuffById),
router.put("/:id", updateGroupStuff),
router.delete("/:id", deleteGroupStuff)

module.exports=router