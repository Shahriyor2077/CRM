const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addGroup = async (req, res) => {
  try {
    const { name, lesson_start_time, lesson_end_time, lesson_week_day, stage_id, branch_id, room_floor, room, lessons_quantity } = req.body;
    const newGroup = await pool.query(
      `INSERT INTO "group" (name,
        lesson_start_time,
        lesson_end_time,
        lesson_week_day,
        stage_id,
        branch_id,
        room_floor,
        room,
        lessons_quantity) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lesson_week_day,
        stage_id,
        branch_id,
        room_floor,
        room,
        lessons_quantity,
      ]
    );
    res.status(201).send(newGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllGroup = async (req, res) => {
  try {
    const groupes = await pool.query(`SELECT *FROM "group"`);
    res.status(200).send(groupes.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await pool.query(`SELECT * FROM "group" WHERE id=$1`, [id]);
    if (!group) {
      return res.status(404).send("group not found");
    }
    res.status(200).send(group.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      lesson_start_time,
      lesson_end_time,
      lesson_week_day,
      stage_id,
      branch_id,
      room_floor,
      room,
      lessons_quantity,
    } = req.body;
    const updateGroup = await pool.query(
      `UPDATE "group" SET name=$1, lesson_start_time=$2, lesson_end_time=$3, lesson_week_day=$4, stage_id=$5, branch_id=$6, room_floor=$7, room=$8, lessons_quantity=$9   WHERE id=$10`,
      [
        name,
        lesson_start_time,
        lesson_end_time,
        lesson_week_day,
        stage_id,
        branch_id,
        room_floor,
        room,
        lessons_quantity,
        id,
      ]
    );
    res.status(200).send(updateGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGroup = await pool.query(`DELETE FROM "group" WHERE id=$1`, [
      id,
    ]);
    if (!deleteGroup) {
      return res.status(404).send("group not found");
    }
    res.status(200).send("group deleted");
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addGroup,
  getAllGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
};
