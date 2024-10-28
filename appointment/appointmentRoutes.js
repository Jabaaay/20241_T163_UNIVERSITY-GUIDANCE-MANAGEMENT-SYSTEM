const express = require('express')

const appointment = express.Router();

const bodyParser = require('body-parser')

appointment.use(bodyParser.urlencoded())
appointment.use(bodyParser.json())

  const appointments = require('../db');

  // admin or staff can view all the appointments

  appointment.get('/appointment', function (req, res) {

    res.json(appointments);
  
})

  appointment.listen(4000)


