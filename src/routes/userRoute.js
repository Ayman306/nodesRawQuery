const express = require("express")
const route = express.Router()
const { registerUser ,login} = require('../controller/userController')
route.route('/register').post(registerUser)
route.route('/login').post(login)



module.exports=route