const { addStudentGroup, getAllStudentGroup, updateStudentGroup, deleteStudentGroup } = require("../controllers/student_group.controller");
const { getStudentsById } = require("../controllers/students.controller");

const router=require("express").Router();

router.post("/", addStudentGroup)
router.get("/", getAllStudentGroup)
router.get("/:id", getStudentsById)
router.put("/:id", updateStudentGroup)
router.delete("/:id", deleteStudentGroup)

module.exports=router