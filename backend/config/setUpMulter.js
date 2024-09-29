const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwt_secret = "abc123";
var db = require("../config/setUpDB.js")
// Set up storage configuration for mentee uploads
var storageconfig = multer.diskStorage({
    destination: async (req, file, callback) => {
        const uploadsDir = "../uploads";
        token = req.headers.authorization.split(" ")[1]; //extracting token
        const decoded = jwt.verify(token, jwt_secret);
        const email = decoded.id
        const connection = await db()
        var query = `select Id from users where Email='${email}'`
        var [results, fields] = await connection.execute(query);
        req.user = results[0]['Id']
        const menteeFolder = `${uploadsDir}/${req.user}`;

        // Check if the base 'uploads' folder exists, create if not
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        // Create folder for each mentee based on their username
        if (!fs.existsSync(menteeFolder)) {
            fs.mkdirSync(menteeFolder);
        }

        // Store files in the specific mentee's folder
        callback(null, menteeFolder);
    },
    filename: (req, file, callback) => {
        // Set a unique name for each uploaded file
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        callback(null, `${file.fieldname}-${uniqueSuffix}`);
    }
});

// File filter to allow only certain file types
const docfilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type! Only PDF and DOCX are allowed."), false);
    }
};

// Set up multer configuration with storage and file filter
var upload = multer({
    storage: storageconfig,
    fileFilter: docfilter,
});

// Define upload fields for mentee (resume, sop, consent_letter)
const menteeUpload = upload.fields([
    { name: "cv" },         // Resume field
    { name: "statementOfPurpose" },            // Statement of purpose field
    { name: "consentLetter" }   // Consent letter field
]);

module.exports = {menteeUpload}