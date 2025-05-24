const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addLesson = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const newLesson = await pool.query(
      `INSERT INTO lesson (
        lesson_theme, lesson_number, group_id, lesson_date
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [lesson_theme, lesson_number, group_id, lesson_date]
    );

    res.status(201).send(newLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLesson = async (req, res) => {
  try {
    const lessons = await pool.query(`SELECT * FROM lesson`);
    res.status(200).send(lessons.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await pool.query(
      `SELECT * FROM lesson WHERE id = $1`,
      [id]
    );

    if (lesson.rowCount === 0) {
      return res.status(404).send({ message: "Student lesson not found" });
    }

    res.status(200).send(lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const lesson = await pool.query(
      `UPDATE lesson 
       SET lesson_theme = $1, lesson_number = $2, group_id = $3, lesson_date = $4 
       WHERE id = $5 RETURNING *`,
      [lesson_theme, lesson_number, group_id, lesson_date, id]
    );

    if (lesson.rowCount === 0) {
      return res.status(404).send({ message: "Lesson not found" });
    }

    res.status(200).send(lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM lesson WHERE id = $1 RETURNING *`,
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
  addLesson,
  getAllLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
};

