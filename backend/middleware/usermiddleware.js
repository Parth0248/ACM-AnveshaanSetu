const jwt = require("jsonwebtoken");
const jwt_secret = "abc123";
var db = require("../config/setUpDB.js")

const protectMentee = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) //token is in headers and starts with Bearer token
    {
        const connection = await db()
        try {
            token = req.headers.authorization.split(" ")[1]; //extracting token
            const decoded = jwt.verify(token, jwt_secret);
            const email = decoded.id
            var query = `select Id from users where Email='${email}'`
            var [results, fields] = await connection.execute(query);
            if (results?.length>0) {
                req.user = results[0]["Id"]
                next();
            }
            else {
                return res.sendStatus(500)
            }
        }
        catch (err) {
            return res.status(401).json("not authorized");
        }
        finally {
            if (connection) {
                await connection.end();
                console.log('Database connection closed');
            }
        }
    }
    if (!token) {
        return res.status(401).json("not authorized, not token")
    }
}

module.exports = { protectMentee }