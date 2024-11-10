import Admin from "../models/adminModels.js";
import StudentApp from "../models/studentApp.js";
import confirmAppointment from '../models/confirmApp.js'; // New model

// Controller to add a new staff member
const addStaff = async (req, res) => {
    try {
        const adminStaff = new Admin(req.body);
        const saved = await adminStaff.save();
        res.status(200).json(saved);
    } catch (error) {
        console.error("Error adding staff:", error);
        res.status(500).json({ message: "Error adding staff" });
    }
};

// Controller to get all appointment history
const getHistory = async (req, res) => {
    try {
        const studentApp = await StudentApp.find();
        res.status(200).json(studentApp);
    } catch (error) {
        console.error("Error retrieving appointment history:", error);
        res.status(500).json({ message: "Error retrieving appointment history" });
    }
};

// Controller to get pending appointments
const getPendingAppointments = async (req, res) => {
    try {
        const pendingAppointments = await StudentApp.find({ status: 'Waiting for Approval' });
        res.status(200).json(pendingAppointments);
    } catch (error) {
        console.error("Error fetching pending appointments:", error);
        res.status(500).json({ message: "Failed to fetch pending appointments" });
    }
};


const confirmAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        await StudentApp.findByIdAndUpdate(id, { status: 'Confirmed' });
        res.status(200).json({ message: 'Appointment confirmed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to confirm appointment' });
    }
};


export { addStaff, getHistory, getPendingAppointments, confirmAppointment };
