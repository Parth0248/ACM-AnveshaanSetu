const express = require('express');
const jwt = require('jsonwebtoken');
var db = require("../config/setUpDB.js");
const bcrypt = require('bcryptjs');
const { protectAdmin } = require("../middleware/usermiddleware")
router = express.Router()
module.exports = router;

const generateToken = (id) => {
    return jwt.sign({ id }, "abc123");
}

router.get("/profile", protectAdmin, async (req, res) => {
    const connection = await db();
    try{
        const id =req.user;
        var query = `SELECT FirstName, LastName, Email, Affiliation from Admin where Id="${id}"`;
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

router.get("/edit_profile", protectAdmin, async (req, res) => {
    const connection = await db();
    try{
        const id =req.user;
        var query = `SELECT Affiliation, MobileNumber, Email from Admin where Id="${id}"`;
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

router.post("/edit_profile", protectAdmin, async (req, res) => {
    const connection = await db();
    try{
        const query = `UPDATE Admin SET Affiliation='${req.body['affiliation']}', Email='${req.body['email']}', MobileNumber='${req.body['mobileNumber']}' where Id='${req.user}'`;
        const [results] = await connection.execute(query)
        return res.status(200).send(generateToken(req.body['email']))
    }
    catch(e){
        console.error('Error during login:', e);
        return res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.get("/applications", protectAdmin, async (req, res)=>{
    const connection = await db();
    try{
        var query=`
                SELECT 
                A.Id as id,
                u.FirstName AS firstName, 
                u.LastName AS lastName,
                u.Affiliation as affiliation, 
                u.PHDYear as yearOfPhD,
                u.Email as email, u.Gender as gender, u.PHDRegistration as phdRegistration,
                A.justification as justification,
                A.coursework as coursework,
                A.firstPreferenceStatus,
                A.secondPreferenceStatus,
                A.firstPreference,
                A.secondPreference,
                A.researchExperience, A.onlineCourses, A.references_text, A.goals,
                A.cv, A.statementOfPurpose, A.consentLetter, A.researchProblem,
                A.specificActivities, A.advisorName, A.advisorEmail, A.coAdvisorName, A.coAdvisorEmail,
                m1.FirstName AS FirstMentorFirstName, 
                m1.LastName AS FirstMentorLastName,
                m2.FirstName AS SecondMentorFirstName, 
                m2.LastName AS SecondMentorLastName
                FROM Applications A
                INNER JOIN
                Mentor m1 ON A.firstPreference = m1.Id
                INNER JOIN 
                Mentor m2 ON A.secondPreference = m2.Id
                INNER JOIN
                users u on u.Id=A.Mentee_Id
        `
        var [results, fields] = await connection.execute(query)
        var output=[]
        if(results?.length>0){
            results.forEach(ele=>{
                output.push({
                    id:ele.id,
                    firstName:ele.firstName,
                    lastName:ele.lastName,
                    yearOfPhD:ele.yearOfPhD,
                    affiliation:ele.affiliation,
                    firstPreference:`${ele.FirstMentorFirstName} ${ele.FirstMentorLastName}`,
                    secondPreference:`${ele.SecondMentorFirstName} ${ele.SecondMentorLastName}`,
                    cv:ele.cv.replace("../uploads/",""),
                    statementOfPurpose:ele.statementOfPurpose.replace("../uploads/",""),
                    consentLetter:ele.consentLetter.replace("../uploads/",""),
                    pref1status:ele.firstPreferenceStatus,
                    pref2status:ele.secondPreferenceStatus
                })
            })
        }
        return res.status(200).send(output)
    }
    catch(e){
        console.error('Error during login:', e);
        return res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.post("/tie_breaker", protectAdmin, async(req, res)=>{
    const connection = await db();
    try{
        var tie = req.body.preference;
        var id = req.body.Id;

        var query = `SELECT COUNT(*) as count from Applications where Id=${id}`
        var [results, fields] = await connection.execute(query)
        if(results?.length>0 && results[0]['count']>0){
            if(tie===1){
                query = `UPDATE Applications SET firstPreferenceStatus='Accepted', secondPreferenceStatus='Rejected' where Id=${id}`;
            }
            else{
                query = `UPDATE Applications SET firstPreferenceStatus='Rejected', secondPreferenceStatus='Accepted' where Id=${id}`;
            }
            var [results, fields] = await connection.execute(query)
            return res.status(200).send("Successfully Updated")
        }
        return res.status(401).send("Invalid Id")
    }
    catch(e){
        console.error('Error during login:', e);
        return res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.post("/add_mentor", protectAdmin, async(req, res)=>{
    const connection = await db();
    try{
        const password = `#${req.body['firstName']}${req.body['lastName']}${req.body['affiliation']}`
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password.toString(), salt);
        const [results] = await connection.query(
            'Insert Into Mentor (FirstName, LastName, Affiliation, Email, ResearchAreas, Password) values(?, ?, ?, ?, ?, ?)',
             [req.body['firstName'], req.body['lastName'], req.body['affiliation'], req.body['email'], req.body['researchAreas'], hash]
        );
        return res.status(200).send('Added Mentor Successfully');
    }
    catch(e){
        console.error('Error during login:', e);
        return res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})