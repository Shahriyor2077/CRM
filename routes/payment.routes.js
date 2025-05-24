const { AddPayment, getAllPayment, getPaymentById, updatePayment, deletePayment } = require("../controllers/payment.controller");

const router=require("express").Router();


router.post("/", AddPayment)
router.get("/", getAllPayment)
router.get("/:id", getPaymentById)
router.put("/:id", updatePayment)
router.delete("/:id", deletePayment)

module.exports=router