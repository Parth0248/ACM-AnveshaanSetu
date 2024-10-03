const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var db = require("../config/setUpDB.js")
const { protectMentee } = require("../middleware/usermiddleware")
const {menteeUpload} = require("../config/setUpMulter.js")
router = express.Router()
module.exports = router;

router.get("/profile", protectMentee, async (req, res) => {
    const connection = await db();
    try{
        const id =req.user;
        var query = `SELECT * from users where Id="${id}"`;
        var [results, fields] = await connection.execute(query);
        if(results?.length>0){
            return res.status(200).json(results[0]);
        }
    }
    catch(e){
        console.error('Error during login:', e);
        res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.use("/submit-application", menteeUpload, async (req, res) => {
    const connection = await db();
    try{
        const body = req.body;
        const [results] = await connection.query(
            'INSERT INTO Applications(Mentee_ID, Research_Problem, Previous_Research, Relevant_Coursework, ONLINE_COURSES, First_Preference, Second_Preference, Justification, Preference_Vouch, Hope_Achieve, CV_Path, SOP_Path, Consent_Path) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [req.user, body['researchProblem'], body['researchExperience'], body['coursework'], body['onlineCourses'], body['firstPreference'], body['secondPreference'], body['justification'], body['references'], body['goals'], req.files.cv[0].path, req.files.statementOfPurpose[0].path, req.files.consentLetter[0].path]
        )
        return res.status(200).json("APllication SuccessFully Submitted");
    }
    catch(e){
        console.error('Error during login:', e);
        res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.get("/get-mentors", async (req, res)=>{
    const connection = await db();
    try{
        var query = "Select * from Mentor where EnrollmentStatus='CURRENT'"
        var [results, fields] = await connection.execute(query)
        var final_output  = []
        results.forEach(ele => {
            final_output.append({
                label : `${ele['FirstNaMe']} ${ele['LastName']}, ${ele['Working_Place']} - ${ele['ResearchAreas']}`,
                value: ele['Id']
            })
        });
        return res.status(200).send(final_output)
    }
    catch(e){
        console.error('Error during login:', e);
        res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

