const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var db = require("../config/setUpDB.js")

router = express.Router()
module.exports = router;

const generateToken = (id) => {
    return jwt.sign({ id }, "abc123");
}

router.post("/google_login", async (req,res)=>{
    const connection = await db()
    try{
        const login_admin = `SELECT COUNT(*) as count from admin where Email="${req.body.email}"`;
        const login_user = `SELECT COUNT(*) as count from users where Email="${req.body.email}"`;
        const login_mentor = `SELECT COUNT(*) as count from Mentor where Email="${req.body.email}"`;
        var [results] = await connection.execute(login_admin);
        if(results[0]['count'] > 0){
            return res.status(200).json({
                type: "admin",
                token: generateToken(req.body.email),
            });
        }

        var [results] = await connection.execute(login_mentor);
        if(results[0]['count'] > 0){
            return res.status(200).json({
                type: "mentor",
                token: generateToken(req.body.email),
            });
        }

        var [results] = await connection.execute(login_user);
        if(results[0]['count'] > 0){
            return res.status(200).json({
                type: "mentee",
                token: generateToken(req.body.email),
            });
        }

        var [results] = await connection.query(
            'Insert Into users (FirstName, LastName, Email) values (?, ?, ?)',
             [req.body.name,"", req.body.email]
        );

        return res.status(200).json({
            type: "mentee",
            token: generateToken(req.body.email),
        });
    }
    catch(e){
        console.error('Error during login:', e);
        res.status(500).send('Server error');
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.use("/login", async (req, res) => {
    const connection = await db()
    try{
        const { email, password } = req.body;
        const login_admin = `SELECT * from admin where Email="${email}"`;
        const login_user = `SELECT * from users where Email="${email}"`;
        const login_mentor = `SELECT * from Mentor where Email="${email}"`;
        var [results, fields] = await connection.execute(login_admin);

        if(results?.length > 0){
            let flag = await bcrypt.compare(password, results[0].Password)

            if(flag){
                return res.status(200).json({
                    type: "admin",
                    token: generateToken(email),
                });
            }
            else { return res.status(400).send("wrongPass") }
        }

        [results, fields] = await connection.execute(login_mentor);
        
        if(results?.length > 0){
            let flag = await bcrypt.compare(password, results[0].Password)

            if (flag)
                return res.status(200).json({
                    type: "mentor",
                    token: generateToken(email),
                });
            else res.status(400).send("wrongPass")
        }

        [results, fields] = await connection.execute(login_user);
        
        if(results?.length > 0){
            let flag = await bcrypt.compare(password, results[0].Password)

            if (flag)
                return res.status(200).json({
                    type: "mentee",
                    token: generateToken(email),
                });
            else res.status(400).send("wrongPass")
        }
        return res.status(401).send("Pls Sign Up")
    } catch(e){
        console.error('Error during login:', e);
        res.status(500).send('Server error');
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
}
)

router.post('/users/signup', async (req, res)=>{
    const connection = await db()
    try{
        const {email, password, confirmPassowrd, lastName, firstName} = req.body;

        const user_exist = `SELECT count(*) as count from users where Email="${email}"`;

        var [results_count, fields] = await connection.execute(user_exist);
        if(results_count[0].count > 0){
            return res.status(400).send("Email Already Registered");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password.toString(), salt);

        const [results] = await connection.query(
           'Insert Into users (FirstName, LastName, Email, Password) values(?, ?, ?, ?)',
            [firstName, lastName, email, hash]
        );

        return res.status(200).send("Mentee SignUp Complete")
        
    }catch (error){
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.post('/users/google_signup', async (req, res)=>{
    const connection = await db()
    try{
        const user_exist = `SELECT count(*) as count from users where Email="${req.body.email}"`;

        var [results_count, fields] = await connection.execute(user_exist);
        if(results_count[0].count > 0){
            return res.status(400).send("Email Already Registered");
        }

        const [results] = await connection.query(
           'Insert Into users (FirstName, LastName, Email) values (?, ?, ?)',
            [req.body.name, "", req.body.email]
        );

        return res.status(200).json({
            type: "mentee",
            token: generateToken(req.body.email),
        });
        
    }catch (error){
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.post('/mentors/signup', async (req, res)=>{
    const connection = await db()
    try{
        const {email, password, confirmPassowrd, lastName, firstName} = req.body;

        const user_exist = `SELECT count(*) as count from Mentor where Email="${email}"`;

        var [results_count, fields] = await connection.execute(user_exist);
        if(results_count[0].count > 0){
            return res.status(400).send("Email Already Registered");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password.toString(), salt);

        const [results] = await connection.query(
           'Insert Into Mentor (FirstName, LastName, Email, Password) values(?, ?, ?, ?)',
            [firstName, lastName, email, hash]
        );

        return res.status(200).send("Mentor SignUp Complete")
        
    }catch (error){
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})

router.post('/mentors/google_signup', async (req, res)=>{
    const connection = await db()
    try{
        const user_exist = `SELECT count(*) as count from Mentor where Email="${req.body.email}"`;

        var [results_count, fields] = await connection.execute(user_exist);
        if(results_count[0].count > 0){
            return res.status(400).send("Email Already Registered");
        }

        const [results] = await connection.query(
           'Insert Into Mentor (FirstName, LastName, Email) values(?, ?, ?)',
            [req.body.name, "", req.body.email]
        );

        return res.status(200).json({
            type: "mentor",
            token: generateToken(req.body.email),
        });
        
    }catch (error){
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
})