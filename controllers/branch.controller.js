const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response")



const addBranch=async(req, res)=>{
    try {
        const {name, address, call_number}=req.body;
        const newBranch=await pool.query(`INSERT INTO branch (name, address, call_number) values ($1, $2, $3) RETURNING *`, [name, address, call_number]);
        res.status(201).send(newBranch.rows[0])
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getAllBranch=async(req, res)=>{
    try {
       const branches=await pool.query(`SELECT *FROM branch`);
       res.status(200).send(branches.rows);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getBranchById=async(req, res)=>{
    try {
        const {id}=req.params;
        const branch=await pool.query(`SELECT * FROM branch WHERE id=$1`, [id]);
        if(!branch){
            return res.status(404).send("branch not found")
        }
        res.status(200).send(branch.rows[0])
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const updateBranch=async(req, res)=>{
    try {
        const {id}=req.params;
        const {name, address, call_number}=req.body;
        const updateBranch=await pool.query(`UPDATE branch SET name=$1, address=$2, call_number=$3 WHERE id=$4`, [name, address, call_number, id]);
        res.status(200).send(updateBranch.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const deleteBranch=async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteBranch=await pool.query(`DELETE FROM branch WHERE id=$1`, [id]);
        if(!deleteBranch){
            return res.status(404).send("branch not found")
        }
        res.status(200).send("branch deleted")
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports={
    addBranch,
    getAllBranch,
    getBranchById,
    updateBranch,
    deleteBranch,
}