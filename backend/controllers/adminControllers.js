import StudentApp from "../models/studentApp.js"
import Announcement from '../models/annoucementModels.js';
import Admin from "../models/admin.js";
import Concerns from '../models/concerns.js';
import Staff from '../models/staffModels.js';
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

        // Validate header and content
        if (!header || !header.trim()) {
            return res.status(400).json({ 
                success: false,
                message: 'Header is required and cannot be empty' 
            });
        }

        if (!content || !content.trim()) {
            return res.status(400).json({ 
                success: false,
                message: 'Content is required and cannot be empty' 
            });
        }

        // Create new announcement with trimmed values
        const announcement = new Announcement({
            header: header.trim(),
            content: content.trim(),
            fileUrl: req.file ? req.file.path : null
        });

        const savedAnnouncement = await announcement.save();
        res.status(201).json(savedAnnouncement);
  } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to create announcement',
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
  const { googleId, name, email, picture, position } = req.body;

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

    // Check if admin exists
    let admin = await Admin.findOne({ googleId });

    if (!admin) {
      // Create a new admin if they don't exist
      admin = new Admin({ 
        googleId, 
        name, 
        email, 
        picture, 
        position: position || "Admin",
        role: "Admin",
        password: "google-auth" // Placeholder password for Google auth users
      });
      await admin.save();
    } else {
      // Update existing admin's information
      admin.name = name;
      admin.email = email;
      admin.picture = picture;
      await admin.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        role: admin.role,
        googleId: admin.googleId 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return success response with token and admin data
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        picture: admin.picture,
        position: admin.position,
        googleId: admin.googleId
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
  const { googleId } = req.params; 
  const { position } = req.body; 

  try {
    
    const updatedUser = await Admin.findOneAndUpdate(
      { googleId },
      { position },
      { new: true }
    );

    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Return the updated user data
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};


const getNotifications = async (req, res) => {
  try {
    // Fetch notifications from the database and sort by date in descending order
    const notifications = await Concerns.find().sort({ date: -1 });
    
    if (!notifications) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addStaff = async (req, res) => {
  const { fullName, email } = req.body;
  try {
    // Add staff to the database
    const newStaff = new Staff({ fullName, email });
    await newStaff.save();

    res.status(201).json({ message: 'Staff added successfully', data: newStaff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    // Pangita ug i-delete ang notification base sa ID
    const deletedNotification = await Concerns.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error' });
  };
}

  const deleteAnn = async (req, res) => {
    try{
        const announcement = await Announcement.findByIdAndDelete(req.params.id)
        if(!announcement){
            return res.status(404).json({message: "Announcement not Found"});
        }

        res.status(200).json({message: "Announcement has been Deleted!"})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to delete announcement"});
    }

};

const updateAnnouncement = async (req, res) => {
  try {
      const { id } = req.params;
      const { header, content, __v } = req.body; // Include the version from the client
      const fileUrl = req.file ? req.file.path : null;

      const updatedData = { header, content };
      if (fileUrl) updatedData.fileUrl = fileUrl;

      // Attempt to update with optimistic concurrency
      const updatedAnnouncement = await Announcement.findOneAndUpdate(
          { _id: id, __v }, // Match the ID and version
          { ...updatedData, $inc: { __v: 1 } }, // Increment version
          { new: true }
      );

      if (!updatedAnnouncement) {
          return res.status(409).json({ message: 'Version conflict or announcement not found' });
      }

      res.status(200).json(updatedAnnouncement);
  } catch (error) {
      res.status(500).json({ message: 'Error updating announcement', error });
  }
};


const getStaff = async (req, res) => {
  try {
    const staffList = await Staff.find(); // Adjust based on your ORM
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch staff', error });
  }
};

const deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete staff', error });
  }
};






export {deleteStaff, getHistory, confirmAppointment, createAnnouncement, getAnnouncements, handleGoogleLogin, addStaff, updateProfile, getNotifications, deleteNotification, deleteAnn, updateAnnouncement, getStaff};