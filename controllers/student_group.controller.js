const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStudentGroup = async (req, res) => {
  try {
    const {
      student_id,
      group_id
    } = req.body;
    const newStudentGroup = await pool.query(
      `INSERT INTO student_group (
            student_id, group_id
            )values ($1, $2) RETURNING *`,
      [
        student_id,
        group_id
      ]
    );
    res.status(201).send(newStudentGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudentGroup = async (req, res) => {
  try {
    const student_groups = await pool.query(`SELECT * FROM student_group`);
    res.status(200).send(student_groups.rows);
  } catch (error) {
    sendErrorResponse(req, res);
  }
};

const getStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await pool.query(`SELECT * FROM student_group WHERE id=$1`, [id]);
    if (!student.rowCount) {
      return res.status(200).send(student.rows[0]);
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      student_id,
      group_id
    } = req.body;
    const updateStudentGroup = await pool.query(
      `UPDATE student_group SET student_id=$1, group_id=$2, WHERE id=$3`,
      [
        student_id,
        group_id,
        id,
      ]
    );
    res.status(200).send(updateStudentGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStudentGroup = await pool.query(`DELETE FROM student_group WHERE id=$1`, [
      id,
    ]);
    if (!deleteStudentGroup.rowCount) {
      return res.status(404).send("deleted");
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudentGroup,
  getAllStudentGroup,
  getStudentGroupById,
  updateStudentGroup,
  deleteStudentGroup,
};
