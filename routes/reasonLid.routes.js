const { addReasonLid, getAllReasonLid, getReasonLidById, updateReasonLid, deleteReason } = require("../controllers/reasonLid.controller");

const router=require("express").Router();


router.post("/", addReasonLid),
router.get("/", getAllReasonLid),
router.get("/:id", getReasonLidById),
router.put("/:id", updateReasonLid),
router.delete("/:id", deleteReason)

module.exports=router