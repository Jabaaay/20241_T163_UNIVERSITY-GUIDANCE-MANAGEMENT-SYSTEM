import express from "express";
import { addStaff, getHistory } from "../controllers/adminControllers";
import Appointment from "../models/studentApp";

const router = express.Router();

router.get('/', getHistory);

router.post('/', addStaff);

router.put('/studentApp/:id', async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const { status } = req.body; // Get the new status from the request body

        // Find and update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: status }, // Update the status
            { new: true } // Return the updated document
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment); // Return the updated appointment
    } catch (error) {
        console.error('Error confirming appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



export default router;
