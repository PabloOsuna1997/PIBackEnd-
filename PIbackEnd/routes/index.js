const express = require('express');
const route = express.Router();
const controllerLogin = require('../controllers/login.controller.js');

route.get('/', (req,res) =>{
    console.log('say hello');
    res.send('say hello');
})

route.get('/saludame', controllerLogin.get)

module.exports = route;