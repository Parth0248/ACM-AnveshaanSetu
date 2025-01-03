const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/setUpDB")
db()

app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("../uploads"));
app.use("/auth",require("./routes/login.js"));
app.use("/mentee",require("./routes/mentee.js"));
app.use("/mentor",require("./routes/mentor.js"));
app.use("/admin",require("./routes/admin.js"));


const PORT = 8000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))