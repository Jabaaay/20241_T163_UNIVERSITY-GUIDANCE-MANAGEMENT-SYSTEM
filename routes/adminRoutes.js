import express from "express";
import {getAppointment, confirmAppointment, appointmentHistory, addStaff, postAnnouncements, getMessage} from '../controller/adminControllers.js'

const router = express.Router();

// Get All History
router.get('/', getAppointment);

// Admin can confirm the appointment by the student
router.get('/', confirmAppointment);

//Admin can view all history appointments
router.get('/', appointmentHistory);

// Admin can add Staff as Manage the system
router.post("/", addStaff);

// Admin can post announcements
router.post("/", postAnnouncements);

// Admin can get messages for those who have concerns
router.get("/", getMessage);

export default router;


