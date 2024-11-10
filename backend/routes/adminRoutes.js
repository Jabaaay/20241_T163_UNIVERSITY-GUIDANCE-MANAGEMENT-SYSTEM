import express from "express";
import { addStaff, getHistory, getPendingAppointments, confirmAppointment } from "../controllers/adminControllers";

const router = express.Router();

// Route to add a new staff member
router.post('/', addStaff);

// Route to get all appointment history
router.get('/', getHistory);

// Route to get pending appointments
router.get('/', getPendingAppointments);

// Route to confirm a specific appointment by ID
router.put('/confirm/:id', confirmAppointment);


export default router;
