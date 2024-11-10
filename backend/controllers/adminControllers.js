import StudentApp from "../models/studentApp.js"
import Announcement from '../models/annoucementModels.js';
import User from "../models/users.js";
// get all appointments by the student
const getHistory = async (req, res) => {
    try {
        const studentApp = await StudentApp.find();

        
        res.send(studentApp);

    } catch (error) {
        console.log(error)
    }
}


const confirmAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        await StudentApp.findByIdAndUpdate(id, { status: 'Confirmed' });
        res.status(200).json({ message: 'Appointment confirmed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to confirm appointment' });
    }
};

const createAnnouncement = async (req, res) => {
    try {
        const { header, content } = req.body;
        let fileUrl = '';

        if (req.file) {
            fileUrl = req.file.path; // Assuming you're using multer for file uploads
        }

        const announcement = new Announcement({ header, content, fileUrl });
        await announcement.save();
        res.status(201).json({ message: 'Announcement created successfully', announcement });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the announcement' });
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
    const { googleId, name, email, picture } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ googleId });
      if (!user) {
        // Create new user if not found
        user = new User({ googleId, name, email, picture });
        await user.save();
      }
  
      // Respond with user data (or token if using JWT)
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };




export {getHistory, confirmAppointment, createAnnouncement, getAnnouncements, handleGoogleLogin};