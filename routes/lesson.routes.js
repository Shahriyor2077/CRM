const { addLesson, getAllLesson, getLessonById, updateLesson, deleteLesson } = require("../controllers/lesson.controller");

const router=require("express").Router();

router.post("/", addLesson)
router.get("/", getAllLesson)
router.get("/:id", getLessonById)
router.put("/:id", updateLesson)
router.delete("/:id", deleteLesson)

module.exports=router