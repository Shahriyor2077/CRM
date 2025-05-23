const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reson_id,
    } = req.body;
    const newLid = await pool.query(
      `INSERT INTO lid (
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reson_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        trial_lesson_group_id,
        lid_status_id,
        cancel_reson_id,
      ]
    );
    res.status(201).send(newLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLid = async (req, res) => {
  try {
    const lids = await pool.query(`SELECT * FROM lid`);
    res.status(200).send(lids.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getLidById = async (req, res) => {
  try {
    const { id } = req.params;
    const lid = await pool.query(`SELECT * FROM lid WHERE id=$1`, [
      id,
    ]);
    if (!lid.rowCount) {
      return res.status(404).send("lid not found");
    }
    res.status(200).send(lid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLid = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      target_id,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reson_id,
    } = req.body;
    const updateLid = await pool.query(
      `UPDATE lid SET first_name=$1,
      last_name=$2,
      phone_number=$3,
      target_id=$4,
      lid_stage_id=$5,
      test_date=$6,
      trial_lesson_date=$7,
      trial_lesson_time=$8,
      trial_lesson_group_id=$9,
      lid_status_id=$10,
      cancel_reson_id=$11 WHERE id=$12 RETURNING *`,
      [
        first_name,
        last_name,
        phone_number,
        target_id,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        trial_lesson_group_id,
        lid_status_id,
        cancel_reson_id,
        id,
      ]
    );
    res.status(200).send(updateLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteLid = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLid = await pool.query(
      `DELETE FROM lid WHERE id=$1`,
      [id]
    );
    if (!deleteLid.rowCount) {
      return res.status(404).send("lid not found");
    }
    res.status(200).send("deleted");
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addLid,
  getAllLid,
  getLidById,
  updateLid,
  deleteLid,
};
