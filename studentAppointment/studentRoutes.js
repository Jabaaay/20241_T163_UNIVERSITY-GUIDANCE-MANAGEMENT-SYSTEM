const express = require('express')
const studentRoute = express.Router();

const bodyParser = require('body-parser')
studentRoute.use(bodyParser.urlencoded())
studentRoute.use(bodyParser.json())

const studentApp = require('./db');

// student can add appointment
studentRoute.post('/student', async (req, res) => {
    
  const newApp = req.body;

  studentApp.push(newApp);

  res.status(201).json({"Status": "Success! Appointment Added Successfully!", "newApp": newApp})

  
    
  });

  // student can see his or her appointment

  studentRoute.get('/student', function (req, res) {

    res.json(studentApp);
  
})

// student can delete his or her appointment
studentRoute.delete('/student/:id', function (req, res) {

  const id = req.params.id;
  const s = studentApp.findIndex((st) => st.id == id);

  studentApp.splice(s, 1);

  res.status(202).json({"Status": "Success! Appointment Deleted Successfully!"})


})
 

  studentRoute.listen(4000)
