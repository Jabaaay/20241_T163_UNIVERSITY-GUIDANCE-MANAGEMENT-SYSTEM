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

// student can add appointment
const addApp = async (req, res) => {
    try {
        const student = new StudentApp(req.body);
        const saved = await student.save();
        res.status(200).json(saved);
        
    } catch (error) {
        console.log(error)
    }
}

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




export {getHistory, addApp, cancelApp, updateApp, getAnnouncements, handleGoogleLogin};