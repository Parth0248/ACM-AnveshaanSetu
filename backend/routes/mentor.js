const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var db = require("../config/setUpDB.js")
const { protectMentor } = require("../middleware/usermiddleware")
router = express.Router()
module.exports = router;

router.get("/profile", protectMentor, async (req, res) => {
    const connection = await db();
    try{
        const id =req.user;
        var query = `SELECT FirstName, LastName, Email, Affiliation, MobileNumber, ResearchAreas from Mentor where Id="${id}"`;
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

router.get("/edit_profile", protectMentor, async (req, res) => {
    const connection = await db();
    try{
        const id =req.user;
        var query = `SELECT Affiliation, MobileNumber, ResearchAreas from Mentor where Id="${id}"`;
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

router.post("/edit_profile", protectMentor, async (req, res) => {
    const connection = await db();
    try{
        const query = `UPDATE Mentor SET Affiliation='${req.body['affiliation']}', ResearchAreas='${req.body['areasOfExpertise']}', MobileNumber='${req.body['mobileNumber']}' where Id='${req.user}'`;
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

router.use("/acceptApplication", protectMentor, async(req, res)=>{
    const connection = await db();
    try{
        const appId = req.body['id']
        console.log(appId)
        var query = `SELECT firstPreference, secondPreference from Applications where Id=${appId}`
        const [results] = await connection.execute(query)
        if(results?.length>0){
            if(results[0]['firstPreference']===req.user){
                query = `UPDATE Applications SET firstPreferenceStatus='Accepted' where Id=${appId}`
                await connection.execute(query)
            }
            else{
                query = `UPDATE Applications SET secondPreferenceStatus='Accepted' where Id=${appId}`
                await connection.execute(query)
            }
            return res.status(200).send("Application Accepted")
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

router.use("/rejectApplication", protectMentor, async(req, res)=>{
    const connection = await db();
    try{
        const appId = req.body['id']
        console.log(appId)
        var query = `SELECT firstPreference, secondPreference from Applications where Id=${appId}`
        const [results] = await connection.execute(query)
        if(results?.length>0){
            if(results[0]['firstPreference']===req.user){
                query = `UPDATE Applications SET firstPreferenceStatus='Rejected' where Id=${appId}`
                await connection.execute(query)
            }
            else{
                query = `UPDATE Applications SET secondPreferenceStatus='Rejected' where Id=${appId}`
                await connection.execute(query)
            }
            return res.status(200).send("Application Rejected")
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

router.get("/applications", protectMentor, async (req, res)=>{
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
                where A.firstPreference = ${req.user} or A.secondPreference = ${req.user}
        `
        var [results, fields] = await connection.execute(query)
        var output=[]
        if(results?.length>0){
            results.forEach(ele=>{
                var status='Pending'
                if(ele.firstPreference===req.user){
                    status=ele.firstPreferenceStatus
                }
                else{
                    status=ele.secondPreferenceStatus
                }
                output.push({
                    id:ele.id,
                    firstName:ele.firstName,
                    lastName:ele.lastName,
                    affiliation:ele.affiliation,
                    yearOfPhd:ele.yearOfPhD,
                    email:ele.email,
                    gender:ele.gender,
                    phdRegistration:ele.phdRegistration,
                    justification:ele.justification,
                    coursework:ele.coursework,
                    researchExperience:ele.researchExperience,
                    onlineCourses:ele.onlineCourses,
                    firstPreference:`${ele.FirstMentorFirstName} ${ele.FirstMentorLastName}`,
                    secondPreference:`${ele.SecondMentorFirstName} ${ele.SecondMentorLastName}`,
                    references:ele.references_text,
                    goals:ele.goals,
                    cv:ele.cv.replace("../uploads",""),
                    statementOfPurpose:ele.statementOfPurpose.replace("../uploads",""),
                    consentLetter:ele.consentLetter.replace("../uploads",""),
                    researchProblem:ele.researchProblem,
                    specificActivities:ele.specificActivities,
                    advisorName:ele.advisorName,
                    advisorEmail:ele.advisorEmail,
                    coAdvisorName:ele.coAdvisorName,
                    coAdvisorEmail:ele.coAdvisorEmail,
                    status:status
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