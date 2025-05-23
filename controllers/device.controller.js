const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require("node-device-detector/helper");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

const addDevice = async (req, res) => {
  try {
    const {user_id, token} = req.body;
    const userAgent=req.headers["user-agent"]
    console.log(userAgent);
    const result = detector.detect(userAgent);
    console.log("result parse:", result);
    console.log(DeviceHelper.isMobile(result));
    console.log(DeviceHelper.isDesktop(result));
    const newDevice = await pool.query(
      `INSERT INTO "device_tokens" (user_id,
        device,
        os,
        client,
        token) values ($1, $2, $3, $4, $5) RETURNING *`,
      [
        user_id,
        device,
        os,
        client,
        token,
      ]
    );
    res.status(201).send(newDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDevice = async (req, res) => {
  try {
    const devices = await pool.query(`SELECT *FROM "device_tokens"`);
    res.status(200).send(devices.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await pool.query(`SELECT * FROM "device_tokens" WHERE id=$1`, [id]);
    if (!device) {
      return res.status(404).send("device not found");
    }
    res.status(200).send(device.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      device,
      os,
      client,
      token
    } = req.body;
    const updateDevice = await pool.query(
      `UPDATE "device_tokens" SET user_id=$1, device=$2, os=$3, client=$4, token=$5 WHERE id=$6`,
      [
        user_id,
        device,
        os,
        client,
        token,
        id,
      ]
    );
    res.status(200).send(updateDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDevice = await pool.query(`DELETE FROM "device_tokens" WHERE id=$1`, [
      id,
    ]);
    if (!deleteDevice) {
      return res.status(404).send("device not found");
    }
    res.status(200).send("device deleted");
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDevice,
  getAllDevice,
  getDeviceById,
  updateDevice,
  deleteDevice,
};
