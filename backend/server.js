const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser")
const db = require("./config/setUpDB")
db()
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth",require("./routes/login.js"));

const PORT = 8000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))