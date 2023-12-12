const express = require('express')
const app = express()
const client = require("./src/db/dbconn")
const index = require('./src/routes/index')
const bodyParser = require("body-parser")
require('dotenv').config()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',index)

app.listen(process.env.PORT, () => {
    console.log('Listning to port',process.env.PORT);
})