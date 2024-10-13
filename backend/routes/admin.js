const express = require('express');
const jwt = require('jsonwebtoken');
const archiver = require('archiver');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var db = require("../config/setUpDB.js");
const bcrypt = require('bcryptjs');
const { protectAdmin } = require("../middleware/usermiddleware")
const {adminUpload} = require("../config/setUpMulter.js");
const fs = require('fs');
const fastcsv = require('fast-csv');

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

router.get("/get_all_users", protectAdmin, async (req, res)=>{
    const connection = await db();
    try{
        var query = `SELECT Id as id, FirstName as firstName, LastName as lastName, Affiliation as affiliation, PHDYear as phdYear, Email as email from users`;
        var [users] = await connection.execute(query);

        var query = `SELECT Id as id, FirstName as firstName, LastName as lastName, Affiliation as affiliation from Mentor`;
        var [mentors] = await connection.execute(query);
        for(const mentor of mentors){
            mentor['acceptedApplications']=0;
            mentor['rejectedApplications']=0;
        }
        var [applications] = await connection.execute(`SELECT * from Applications`);
        for(const application of applications){
            for(var mentor of mentors){
                if(mentor.id===application.firstPreference){
                    if(application.firstPreferenceStatus==='Accepted') mentor['acceptedApplications']+=1;
                    else if(application.firstPreferenceStatus==='Rejected') mentor['rejectedApplications']+=1;
                }
                if(mentor.id===application.secondPreference){
                    if(application.secondPreferenceStatus==='Accepted') mentor['acceptedApplications']+=1;
                    else if(application.secondPreferenceStatus==='Rejected') mentor['rejectedApplications']+=1;
                }
            }
        }

        var query = `SELECT Id as id, FirstName as firstName, LastName as lastName, Affiliation as affiliation from ADMIN`;
        var [admins] = await connection.execute(query);

        return res.status(200).json({"user":users,
            "mentor":mentors,
            "admin":admins
        });
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
        if(req.body['access']==='Mentor'){
            const [results] = await connection.query(
                'Insert Into Mentor (FirstName, LastName, Affiliation, Email, ResearchAreas, Password) values(?, ?, ?, ?, ?, ?)',
                [req.body['firstName'], req.body['lastName'], req.body['affiliation'], req.body['email'], req.body['researchAreas'], hash]
            );
        }
        else{
            const [results] = await connection.query(
                'Insert Into Admin (FirstName, LastName, Affiliation, Email, Research_Areas, Password) values(?, ?, ?, ?, ?, ?)',
                [req.body['firstName'], req.body['lastName'], req.body['affiliation'], req.body['email'], req.body['researchAreas'], hash]
            );
        }
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

router.post("/add_mentor_csv", adminUpload, async (req, res)=>{
    const connection = await db();
    try{
        const path = req.files.csv[0].path
        const results = []
        fs.createReadStream(path)
            .pipe(fastcsv.parse({ headers: true }))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                const values=[]
                var query = `Insert Into Mentor (FirstName, LastName, Affiliation, Email, ResearchAreas, Password) values `;
                for(const row of results){
                    const password = `#${row.firstName}${row.lastName}${row.affiliation}`
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password.toString(), salt);
                    values.push(`('${row.firstName}', '${row.lastName}', '${row.affiliation}', '${row.email}', '${row.researchAreas}', '${hash}')`)
                }
                console.log(values)
                query += values.join(", ")
                await connection.execute(query);
                if (connection) {
                    await connection.end();
                    console.log('Database connection closed');
                }
        });
        return res.status(200).send('Added Mentors Successfully');
    }
    catch(e){
        console.error('Error during login:', e);
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
        return res.status(500).send('Server error');
    }
})

router.get("/download_zip", protectAdmin, async(req,res)=>{
    const connection = await db();
    try{
        const csvWriter = createCsvWriter({
            path: "../uploads/applications.csv",
            header: [
              { id: 'Id', title: 'ID' },
              { id: 'Mentee_Id', title: 'MenteeID' },
              { id: 'justification', title: 'Justification' },
              { id: 'researchProblem', title: 'ResearchProblem' },
              { id : 'coursework', title: 'CourseWork' },
              { id : 'researchExperience', title : 'ResearchExperience' },
              { id : 'onlineCourses', title : 'OnlineCourses' },
              { id : 'firstPreference', title : 'FirstPreference' },
              { id : 'secondPreference', title : 'SecondPreference' },
              { id : 'references_text', title : 'References' },
              { id : 'goals', title : 'Goals' },
              { id : 'cv', title : 'CV'},
              { id : 'statementOfPurpose', title : 'StatementOfPurpose' },
              { id : 'consentLetter', title : 'ConsentLetter' },
              { id : 'specificActivities', title: 'SpecificActivities'},
              { id : 'advisorName', title : 'AdvisorName' },
              { id : 'advisorEmail', title : 'AdvisorEmail' },
              { id : 'coAdvisorName', title : 'coAdvisorName'},
              { id : 'coAdvisorEmail', title : 'coAdvisorEmail' },
              { id : 'firstPreferenceStatus', title : 'firstPreferenceStatus'},
              { id : 'secondPreferenceStatus', title : 'secondPreferenceStatus'},
            ]
        });
        const [applications] = await connection.execute(`SELECT * from Applications`);
        await csvWriter.writeRecords(applications);
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename=folder.zip');

        const archive = archiver('zip', {
            zlib: { level: 5 } // Sets the compression level (0-9, 9 being the highest compression)
        });

        archive.on('error', (err) => {
            res.status(500).send({ error: 'Failed to create zip file.' });
        });

        archive.on('finish', ()=>{
            var flag = fs.existsSync("../uploads/applications.csv")
            if (flag) {
                fs.unlinkSync("../uploads/applications.csv")
            }
        })

        archive.pipe(res);
        const folderPath = "../uploads/"

        archive.directory(folderPath, false);
        archive.finalize();
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