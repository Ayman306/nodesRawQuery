const express = require("express")
const app = express()
const productRoute = require('../routes/productRoute')
const userRoute = require('../routes/userRoute')
app.use('/product', productRoute)
app.use('/user',userRoute)

module.exports=app