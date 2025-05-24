
const express = require("express");
const router = express.Router();

const {
  addStudent_lesson,
  getAllStudentLesson,
  getStudentLessonById,
  updateStudentLesson,
  deleteStudentLesson,
} = require("../controllers/student_lesson.controller");

router.get("/", getAllStudentLesson);
router.get("/:id", getStudentLessonById);
router.post("/", addStudent_lesson);
router.put("/:id", updateStudentLesson);
router.delete("/:id", deleteStudentLesson);

module.exports = router;
