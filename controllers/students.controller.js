const pool = require("../config/db")
const { sendErrorResponse } = require("../helpers/send_error_response")



const addStudents=async(req, res)=>{
    try {
        const {lid_id, first_name, last_name, phone_number, birthday, male}=req.body
        const newStudents = await pool.query(
          `INSERT INTO students (
            lid_id, first_name, last_name, phone_number, birthday, male
            )values ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [lid_id, first_name, last_name, phone_number, birthday, male]
        );
        res.status(201).send(newStudents.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
};


const getAllStudents=async(req, res)=>{
    try {
        const students = await pool.query(`SELECT * FROM students`);
        res.status(200).send(students.rows);
    } catch (error) {
        sendErrorResponse(req, res)
    }
}

const getStudentsById=async(req, res)=>{
    try {
        const{id}=req.params;
        const student=await pool.query(`SELECT * FROM students WHERE id=$1`, [id]);
        if(!student.rowCount){
            return res.status(200).send(student.rows[0])
        }
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

const updateStudents=async(req, res)=>{
    try {
        const {id}=req.params;
        const { lid_id, first_name, last_name, phone_number, birthday, male }=req.body;
      const updateStudents = await pool.query(
        `UPDATE students SET lid_id=$1, first_name=$2, last_name=$3, phone_number=$4, birthday=$5, male=$6, WHERE id=$7`,
        [lid_id, first_name, last_name, phone_number, birthday, male, id]
      );
      res.status(200).send(updateStudents.rows[0]);
    } catch (error) {
        sendErrorResponse(error, res)
    }
};

const deleteStudents=async(req, res)=>{
    try {
        const {id}=req.params;
        const deleteStudents=await pool.query(`DELETE FROM students WHERE id=$1`, [id]);
        if(!deleteStudents.rowCount){
            return res.status(404).send("deleted")
        }
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports={
    addStudents,
    getAllStudents,
    getStudentsById,
    updateStudents,
    deleteStudents
}