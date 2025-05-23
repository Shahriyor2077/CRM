const pool = require("../config/db")
const { sendErrorResponse } = require("../helpers/send_error_response")


const addReasonLid=async(req, res)=>{
    try {
        const {reason_lid}=req.body
        const newReason=await pool.query(`INSERT INTO reasonlid (reason_lid) values($1) RETURNING *`, [reason_lid])
        res.status(201).send(newReason.rows[0])
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getAllReasonLid=async (req, res)=>{
    try {
        const reasons=await pool.query(`SELECT * FROM reasonlid`);
        res.status(200).send(reasons.rows)
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getReasonLidById=async(req, res)=>{
    try {
        const {id}=req.params;
        const reason=await pool.query(`SELECT * FROM reasonlid WHERE id=$1`, [id]);
        if(!reason.rowCount){
            return res.status(404).send("reason not found")
        }
        res.status(200).send(reason.rows[0]);
    } catch (error) {
        sendErrorResponse
    }
}

const updateReasonLid=async(req, res)=>{
    try {
        const {id}=req.params;
        const {reason_lid}=req.body;
        const updateReason=await pool.query(`UPDATE reasonlid SET reason_lid=$1 WHERE id=$2 RETURNING*`, [reason_lid, id]);
        res.status(200).send(updateReason.rowCount[0]);
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const deleteReason=async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteReason=await pool.query(`DELETE FROM reasonlid WHERE id=$1`, [id]);
        if(!deleteReason.rowCount){
            return res.status(404).send("reason not found")
        }
        res.status(200).send("reason deleted")
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports={
    addReasonLid,
    getAllReasonLid,
    getReasonLidById,
    updateReasonLid,
    deleteReason
}