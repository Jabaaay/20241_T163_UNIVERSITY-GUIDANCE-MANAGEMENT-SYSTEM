import StudentApp from "../models/studentApp.js"
import Announcement from '../models/annoucementModels.js';
import User from "../models/users.js";
import Concerns from '../models/concerns.js';
import jwt from 'jsonwebtoken';

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
      const [startTime] = time.split(" - ");
      const appointmentDateTime = new Date(`${date}T${startTime}:00`);
      const currentDateTime = new Date();

      // Check if the appointment date and time are in the past
      if (appointmentDateTime < currentDateTime) {
          return res.status(400).json({ 
              success: false,
              message: "Cannot book an appointment in the past." 
          });
      }

      if(req.body.appType == '' || req.body.purpose == '' || req.body.date == '' || req.body.time == ''){
        return res.status(400).json({
          success: false,
          message: "Please fill up all the fields."
        });
      }

      // Check if an appointment already exists for the same date and time
      const existingAppointment = await StudentApp.findOne({
          date: req.body.date,
          time: req.body.time,
          status: { $ne: 'Cancelled' } // Only check non-cancelled appointments
      });

      if (existingAppointment) {
          return res.status(400).json({ 
              success: false,
              message: "This time slot is already booked." 
          });
      }

      const userName = req.body.userName;
      const student = new StudentApp({
          ...req.body,
          userName,
      });

      const saved = await student.save();
      res.status(200).json({
          success: true,
          message: "Appointment created successfully",
          appointment: saved
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
          success: false,
          message: 'Failed to add appointment' 
      });
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
    try {
        const { id } = req.params;
        const { date, time, appType, purpose } = req.body;

        // Validate required fields
        if (!date || !time || !appType || !purpose) {
            return res.status(400).json({
                success: false,
                message: "Please fill up all the fields."
            });
        }

        // Check if the appointment exists
        const appointment = await StudentApp.findById(id);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        // Check if the selected date is a weekend
        const selectedDate = new Date(date);
        const day = selectedDate.getDay();
        if (day === 0 || day === 6) {
            return res.status(400).json({
                success: false,
                message: "Appointments cannot be scheduled on weekends."
            });
        }

        // Check if the selected date is in the past
        const currentDate = new Date();
        if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
            return res.status(400).json({
                success: false,
                message: "Cannot schedule appointments in the past."
            });
        }

        // If selected date is today, check if the time slot has passed
        if (selectedDate.toDateString() === currentDate.toDateString()) {
            const [startHourStr] = time.split(" - ")[0].split(":");
            const startHour = parseInt(startHourStr);
            const currentHour = currentDate.getHours();

            if (startHour <= currentHour) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot select a past time slot."
                });
            }
        }

        // Check if the time slot is already booked by another appointment
        const existingAppointment = await StudentApp.findOne({
            date: date,
            time: time,
            status: { $ne: 'Cancelled' },
            _id: { $ne: id } // Exclude the current appointment being edited
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "This time slot is already booked by another appointment."
            });
        }

        // Update the appointment
        const updatedAppointment = await StudentApp.findByIdAndUpdate(
            id,
            {
                appType,
                purpose,
                date,
                time
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            appointment: updatedAppointment
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update appointment",
            error: error.message
        });
    }
};

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
      // Validate email domain
      const allowedDomain = 'student.buksu.edu.ph';
      const emailDomain = email.split('@')[1];

      if (emailDomain !== allowedDomain) {
        return res.status(400).json({
          success: false,
          message: 'Please use your BukSU student email (@student.buksu.edu.ph)'
        });
      }

      let user = await User.findOne({ googleId });
  
      if (!user) {
        // Create a new user if they don't exist
        user = new User({ 
          googleId, 
          name, 
          email, 
          picture, 
          course: course || '',
          department: department || '',
          role: 'Student'
        });
        await user.save();
      } else {
        // Update the existing user
        user.name = name;
        user.email = email;
        user.picture = picture;
        user.course = course || user.course;
        user.department = department || user.department;
        await user.save();
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          role: user.role,
          googleId: user.googleId 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({ 
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          picture: user.picture,
          course: user.course,
          department: user.department,
          googleId: user.googleId
        }
      });
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error during login',
        error: error.message 
      });
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