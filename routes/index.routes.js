const router = require("express").Router();
const stageRouter= require("./stage.routes");
const lidStatusRouter=require("./lidStatus.routes")
const reasonLidRouter=require("./reasonLid.routes")
const groupStuffRouter=require("./groupStuff.routes")
const branchRouter=require("./branch.routes")
const groupRouter=require("./group.routes")
const deviceRouter=require("./device.routes")
const lidRouter=require("./lid.routes")
const studentsRouter=require("./students.routes")
const paymentRouter=require("./payment.routes")
const student_groupRouter=require("./studentGroup.routes")
const studentLessonRouter=require("./student_lesson.routes")
const lessonRouter=require("./lesson.routes")

router.use("/stage", stageRouter)
router.use("/status", lidStatusRouter)
router.use("/reason", reasonLidRouter)
router.use("/group_stuff", groupStuffRouter)
router.use("/branch", branchRouter)
router.use("/group", groupRouter)
router.use("/device", deviceRouter)
router.use("/lid", lidRouter)
router.use("/students", studentsRouter)
router.use("/payment", paymentRouter)
router.use("/student_group", student_groupRouter)
router.use("/student_lesson", studentLessonRouter)
router.use("/lesson", lessonRouter)

module.exports = router;
