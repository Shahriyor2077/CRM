const { addBranch, getAllBranch, getBranchById, updateBranch, deleteBranch } = require("../controllers/branch.controller");

const router=require("express").Router();


router.post("/", addBranch)
router.get("/", getAllBranch)
router.get("/:id", getBranchById)
router.put("/:id", updateBranch)
router.delete("/:id", deleteBranch)

module.exports=router