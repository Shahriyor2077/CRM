const { addStudents, getAllStudents, getStudentsById, updateStudents, deleteStudents } = require("../controllers/students.controller");

const router=require("express").Router();

router.post("/", addStudents)
router.get("/", getAllStudents)
router.get("/:id", getStudentsById)
router.put("/:id", updateStudents)
router.delete("/:id", deleteStudents)

module.exports=router