const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response")
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


const addStage=async (req, res)=>{
    try {
        const {name, description}=req.body;
        const newStage=await pool.query(`INSERT INTO stage (name, description)
            values ($1, $2)RETURNING *
            `, [name, description]
        );
        console.log(newStage);

        res.status(201).send(newStage.rows[0])
    } catch (error) {
        sendErrorResponse(error, res)
    }
};

const getAllStages=async (req, res)=>{
    try {
        const userAgent=req.headers["user-agent"]
        console.log(userAgent);
        const result=detector.detect(userAgent)
        console.log("result parse:", result);
        console.log(DeviceHelper.isMobile(result));
        console.log(DeviceHelper.isDesktop(result));




      const stages = await pool.query(`SELECT * FROM stage`);
      res.status(200).send(stages.rows);
    } catch (error) {
      sendErrorResponse(error, res);
    }
};

const getStageById=async(req, res)=>{
    try {
        const {id}=req.params;
        const stage=await pool.query(`SELECT * FROM stage WHERE id=$1`, [id]);
        if(!stage.rowCount){
            return res.status(404).send("stage not found")
        }
        res.status(200).send(stage.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const updateStage=async(req, res)=>{
    try {
        const {id}=req.params;
        const {name, description}=req.body;
        const updateStage=await pool.query(
            `UPDATE stage SET name=$1, description=$2 WHERE id=$3 RETURNING*`,[name, description, id]);
        res.status(200).send(updateStage.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const deleteStage=async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteStage=await pool.query(`DELETE FROM stage WHERE id=$1`, [id]);
        if(!deleteStage.rowCount){
            return res.status(404).send("stage not found")
        }
        res.status(200).send("stage deleted")
    } catch (error) {
        sendErrorResponse(error, res)
    }
}



module.exports={addStage, getAllStages, getStageById, updateStage, deleteStage}