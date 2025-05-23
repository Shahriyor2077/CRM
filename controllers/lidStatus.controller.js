const pool = require("../config/db")
const { sendErrorResponse } = require("../helpers/send_error_response")


const addLidStatus=async(req, res)=>{
    try {
        const {status}=req.body
        const newLidStatus=await pool.query(`INSERT INTO lidstatus (status) values ($1) RETURNING *`, [status]);
        res.status(201).send(newLidStatus.rows[0])
    } catch (error) {
        sendErrorResponse(error, res)
    }
};


const getAllLidStatus=async(req, res)=>{
    try {
        const lidStatuses=await pool.query(`SELECT * FROM lidstatus`)
        res.status(200).send(lidStatuses.rows);
    } catch (error) {
        sendErrorResponse(error, res)
    }
};

const getLidStatusById=async(req, res)=>{
    try {
        const {id}=req.params;
        const lidStatus=await pool.query(`SELECT * FROM lidstatus WHERE id=$1`, [id]);
        if(!lidStatus.rowCount){
            return res.status(404).send("lidstatus not found")
        }
        res.status(200).send(lidStatus.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const updateLidStatus=async(req, res)=>{
    try {
        const {id}=req.params;
        const {status}=req.body;
        const updateLidStatus=await pool.query(`UPDATE lidstatus SET status=$1 WHERE id=$2 RETURNING *`, [status, id]);
        res.status(200).send(updateLidStatus.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const deleteLidStatus=async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteLidStatus=await pool.query(`DELETE FROM lidstatus WHERE id=$1`, [id])
        if(!deleteLidStatus.rowCount){
            return res.status(404).send("lidStatus not found")
        }
        res.status(200).send("deleted")
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports={
    addLidStatus,
    getAllLidStatus,
    getLidStatusById,
    updateLidStatus,
    deleteLidStatus
    
}