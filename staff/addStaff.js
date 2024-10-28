const express = require('express');


const staff = express.Router();


const addStaff = require('../staffDb');

// Add Staff
staff.post('/student', async (req, res) => {
    
  const newStaff = req.body;

  addStaff.push(newStaff);

  res.status(201).json({"Status": "Success! Staff Added Successfully!", "newStaff": newStaff})

  
    
  });

  staff.listen(4000)

