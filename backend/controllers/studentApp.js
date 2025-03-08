import StudentApp from "../models/studentApp.js"
import Announcement from '../models/annoucementModels.js';
import User from "../models/users.js";
import Concerns from '../models/concerns.js';

// get all appointments by the student


const getHistory = async (req, res) => {
  try {
      const studentApp = await StudentApp.find();

      // Send the response with a status code of 200 (OK)
      res.status(200).send(studentApp);

  } catch (error) {
      console.log(error);

      // Send an error response with a status code of 500 (Internal Server Error)
      res.status(500).send({ message: 'An error occurred while fetching data' });
  }
}

const Users = async (req, res) => {
  try {
      const studentApp = await User.find();

      // Send the response with a status code of 200 (OK)
      res.status(200).send(studentApp);

  } catch (error) {
      console.log(error);

      // Send an error response with a status code of 500 (Internal Server Error)
      res.status(500).send({ message: 'An error occurred while fetching data' });
  }
}

const addApp = async (req, res) => {
  try {
      const { date, time } = req.body;

      // Combine date and time to create a full Date object
      const appointmentDateTime = new Date(`${date}T${time.split(" - ")[0]}:00`); // Convert time range to valid Date format
      const currentDateTime = new Date();

      // Check if the appointment date and time are in the past
      if (appointmentDateTime < currentDateTime) {
          return res.status(400).json({ message: "Cannot book an appointment in the past." });
      }

      // Check if an appointment already exists for the same date and time
      const existingAppointment = await StudentApp.findOne({
          date: req.body.date,
          time: req.body.time
      });

      if (existingAppointment) {
          return res.status(400).json({ message: "This time slot is already booked." });
      }

      const userName = req.body.userName;
      const student = new StudentApp({
          ...req.body,
          userName,
      });

      const saved = await student.save();
      res.status(200).json(saved);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add appointment' });
  }
};



// student can delete or cancel the appointment
const cancelApp = async (req, res) => {
    try{
        const student = await StudentApp.findByIdAndDelete(req.params.id)
        if(!student){
            return res.status(404).json({message: "Appointment not Found"});
        }

        res.status(200).json({message: "Appointment cancelled by student"})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to delete appointment"});
    }

}




//student can update appointment
const updateApp = async (req, res) => {
    try{
        const student = await StudentApp.findById(req.params.id)
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        student.appType = req.body.appType || student.appType;
        student.purpose = req.body.purpose || student.purpose;
        student.date = req.body.date || student.date;
        student.time = req.body.time || student.time;

        

        const updatedStudent = await student.save();
        res.status(200).json(updatedStudent);
        
    }catch(error){
        console.log(error)
    }
}

const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching announcements' });
    }
};

const handleGoogleLogin = async (req, res) => {
    const { googleId, name, email, picture, course, department } = req.body;
  
    try {
      let user = await User.findOne({ googleId });
  
      if (!user) {
        // Create a new user if they don't exist
        user = new User({ googleId, name, email, picture, course, department });
        await user.save();
      } else {
        // Update the existing user
        user.course = course || user.course;
        user.department = department || user.department;
        await user.save();
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  const updateProfile = async (req, res) => {
    const { googleId } = req.params; // Get the googleId from URL parameter
    const { course, department } = req.body; // Extract course and department from the request body
  
    try {
      // Find the user by googleId and update the profile
      const updatedUser = await User.findOneAndUpdate(
        { googleId },
        { course, department },
        { new: true } // Return the updated document
      );
  
      // If user not found, send a 404 response
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the updated user data
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
    });
    
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating profile' });
    }
  };

  const logoutController = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Could not log out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ success: true, message: 'Logged out' });
    });
};

// Route to handle contact form submission
const submitContactForm = async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMessage = new Concerns({
      fullName,
      email,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Your message has been submitted successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





export {getHistory, Users, addApp, cancelApp, updateApp, getAnnouncements, handleGoogleLogin, logoutController, updateProfile, submitContactForm};