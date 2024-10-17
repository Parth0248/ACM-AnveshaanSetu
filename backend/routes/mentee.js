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
        var query = `SELECT FirstName, LastName, Email, Affiliation, MobileNumber, Gender, PHDRegistration, PHDYear, AddToMailingList, Degree, Insta, DOB, Linkedin, Facebook, Twitter from users where Id="${id}"`;
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

router.post("/profile", protectMentee, async (req, res) => {
    const connection = await db();
    try{
        console.log(req.body)
        const query = `UPDATE users SET FirstName='${req.body['firstName']}', LastName='${req.body['lastName']}', Email='${req.body['email']}', Affiliation='${req.body['affiliation']}', MobileNumber='${req.body['mobileNumber']}', Gender='${req.body['gender']}', PHDRegistration='${req.body['phdRegistration']}', PHDYear='${req.body['yearOfPhd']}', AddToMailingList='${req.body['acmMailingList']}', DOB='${req.body['DOB']}', Degree='${req.body['degree']}', Insta='${req.body['Insta']}', Facebook='${req.body['Facebook']}', Twitter='${req.body['Twitter']}', Linkedin='${req.body['Linkedin']}' where Id='${req.user}'`;
        const [results] = await connection.execute(query)
        return res.status(200).send('Profile Updated');
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

router.get("/check_applied", protectMentee, async(req,res)=>{
    const connection = await db();
    try{
        var [user] = await connection.execute(`SELECT * from users where Id='${req.user}'`);
        var incomplete = false;
        if(user?.length>0){
            for(let key in user[0]){
                if(key==='Password') continue;
                if(user[0][key]===null || user[0][key]==='null'){
                    incomplete = true;
                }
            }
        }
        const query = `SELECT COUNT(*) as count from Applications where Mentee_Id='${req.user}'`
        const [results] = await connection.execute(query)
        if(results?.length>0){
            if(results[0]['count']>0){
                return res.status(200).send({'applied':true, 'incomplete':incomplete});
            }
            else{
                return res.status(200).send({'applied':false, 'incomplete':incomplete});
            }
        }
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

router.use("/submit-application", menteeUpload, async (req, res) => {
    const connection = await db();
    try{
        const body = req.body;
        const [results] = await connection.query(
            'INSERT INTO Applications(Mentee_ID, justification, researchProblem, coursework, researchExperience, onlineCourses, firstPreference, secondPreference, references_text, goals, cv, statementOfPurpose, consentLetter, specificActivities, advisorName, advisorEmail, coAdvisorName, coAdvisorEmail, agree) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [req.user, body['justification'], body['researchProblem'], body['coursework'], body['researchExperience'], body['onlineCourses'], body['firstPreference'], body['secondPreference'], body['references'], body['goals'], req.files.cv[0].path, req.files.statementOfPurpose[0].path, req.files.consentLetter[0].path, body['specificActivities'], body['advisorName'], body['advisorEmail'], body['coAdvisorName'], body['coAdvisorEmail'], body['agree']]
        )
        return res.status(200).json("APllication SuccessFully Submitted");
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

router.get("/get-mentors", protectMentee, async (req, res)=>{
    const connection = await db();
    try{
        var [applied] = await connection.execute(`SELECT COUNT(*) as count from Applications where Mentee_Id='${req.user}'`)
        if(applied[0]['count']>0){
            return res.status(201).send("already applied")
        }
        var query = "Select * from Mentor where EnrollmentStatus='CURRENT'"
        var [results, fields] = await connection.execute(query)
        var final_output  = []
        results.forEach(ele => {
            final_output.push({
                label : `${ele['FirstName']} ${ele['LastName']}, ${ele['Affiliation']} - ${ele['ResearchAreas']}`,
                value: ele['Id']
            })
        });
        return res.status(200).send(final_output)
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

router.get("/applications", protectMentee, async(req, res)=>{
    const connection = await db();
    try{
        var query =`
                SELECT A.Id as id,  
                A.firstPreferenceStatus, 
                A.secondPreferenceStatus, 
                A.researchProblem,
                m1.FirstName AS FirstMentorFirstName, 
                m1.LastName AS FirstMentorLastName,
                m2.FirstName AS SecondMentorFirstName, 
                m2.LastName AS SecondMentorLastName,
                u.FirstName AS firstName, 
                u.LastName AS lastName,
                u.Email as email, u.Affiliation as affiliation, u.PHDYear as yearOfPhD
                FROM Applications as A
                INNER JOIN
                Mentor m1 ON A.firstPreference = m1.Id
                INNER JOIN 
                Mentor m2 ON A.secondPreference = m2.Id
                INNER JOIN
                users u ON u.Id = A.Mentee_Id
                where A.Mentee_Id=${req.user}
        `
        var [results, fields] = await connection.execute(query)
        var output=[]
        if(results?.length>0){
            results.forEach(ele=>{
                output.push({
                    id:ele.id,
                    firstName:ele.firstName,
                    lastName:ele.lastName,
                    email:ele.email,
                    yearOfPhD:ele.yearOfPhD,
                    affiliation:ele.affiliation,
                    firstPreference:`${ele.FirstMentorFirstName} ${ele.FirstMentorLastName}`,
                    secondPreference:`${ele.SecondMentorFirstName} ${ele.SecondMentorLastName}`,
                    researchProblem:ele.researchProblem,
                    firstPreferenceStatus:ele.firstPreferenceStatus,
                    secondPreferenceStatus:ele.secondPreferenceStatus
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

