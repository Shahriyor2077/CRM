
const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStudent_lesson = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const newStudentLesson = await pool.query(
      `INSERT INTO student_lesson (
        lesson_id, student_id, is_there, reason, be_paid
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [lesson_id, student_id, is_there, reason, be_paid]
    );

    res.status(201).send(newStudentLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudentLesson = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM student_lesson`);
    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStudentLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM student_lesson WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Student lesson not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const result = await pool.query(
      `UPDATE student_lesson 
       SET lesson_id = $1, student_id = $2, is_there = $3, reason = $4, be_paid = $5 
       WHERE id = $6 RETURNING *`,
      [lesson_id, student_id, is_there, reason, be_paid, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Student lesson not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM student_lesson WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Student lesson not found" });
    }

    res.status(200).send({ message: "Deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudent_lesson,
  getAllStudentLesson,
  getStudentLessonById,
  updateStudentLesson,
  deleteStudentLesson,
};
