const express = require('express')
const {login} = require('../controllers/UserControllers.js')


const authroute = express.Router();

// authroute.post('/login' , )
authroute.post('/login',login );

module.exports = authroute