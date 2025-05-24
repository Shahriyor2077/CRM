const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const AddPayment = async (req, res) => {
  try {
    const { student_id, payment_last_date, payment_date, price, is_paid, total_attent } =
      req.body;
    const newPayment = await pool.query(
      `INSERT INTO payment (
            student_id, payment_last_date, payment_date, price, is_paid, total_attent
            )values ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [student_id, payment_last_date, payment_date, price, is_paid, total_attent]
    );
    res.status(201).send(newPayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllPayment = async (req, res) => {
  try {
    const payments = await pool.query(`SELECT * FROM payment`);
    res.status(200).send(payments.rows);
  } catch (error) {
    sendErrorResponse(req, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await pool.query(`SELECT * FROM payment WHERE id=$1`, [
      id,
    ]);
    if (!student.rowCount) {
      return res.status(200).send(student.rows[0]);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, payment_last_date, payment_date, price, is_paid, total_attent } =
      req.body;
    const updatePayment = await pool.query(
      `UPDATE payment SET student_id=$1, payment_last_date=$2, payment_date=$3, price=$4, is_paid=$5, total_attent=$6, WHERE id=$7`,
      [student_id, payment_last_date, payment_date, price, is_paid, total_attent, id]
    );
    res.status(200).send(updatePayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePayment = await pool.query(
      `DELETE FROM payment WHERE id=$1`,
      [id]
    );
    if (!deletePayment.rowCount) {
      return res.status(404).send("deleted");
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  AddPayment,
  getAllPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
