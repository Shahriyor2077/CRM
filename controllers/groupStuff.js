const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response")


const addGroupStuff=async(req, res)=>{
    try {
        const {group_id, stuff_id}=req.body;
        const newGroupStuff=await pool.query(`INSERT INTO group_stuff (group_id, stuff_id) values ($1, $2)RETURNING *`, [group_id, stuff_id]);
        res.status(201).send(newGroupStuff.rows[0])
    } catch (error) {
        sendErrorResponse(error, res)
    }
};

const getAllGroupStuff=async(req, res)=>{
    try {
        const AllGroupStuff=await pool.query(`SELECT * FROM group_stuff`);
        res.status(200).send(AllGroupStuff.rows)
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const getGroupStuffById=async(req, res)=>{
    try {
        const { id } = req.params;
        const GroupStuff = await pool.query(
          `SELECT * FROM group_stuff WHERE id=$1`,
          [id]
        );
        if (!GroupStuff.rowCount) {
          return res.status(404).send("group_stuff not found");
        }
        res.status(200).send(GroupStuff.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const updateGroupStuff=async(req, res)=>{
    try {
        const{id}=req.params;
        const {group_id, stuff_id}=req.body;
        const updateGroupStuff=await pool.query(`UPDATE group_stuff SET group_id=$1, stuff_id=$2 RETURNING *`, [group_id, stuff_id, id]);
        res.status(200).send(updateGroupStuff.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const deleteGroupStuff=async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteGroupStuff=await pool.query(`DELETE FROM group_stuff WHERE id=$1`, [id])
        if(!deleteGroupStuff.rowCount){
            return res.status(404).send("group_stuff not found")
        }
        res.status(200).send("deleted")
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports={
    addGroupStuff,
    getAllGroupStuff,
    getGroupStuffById,
    updateGroupStuff,
    deleteGroupStuff
}