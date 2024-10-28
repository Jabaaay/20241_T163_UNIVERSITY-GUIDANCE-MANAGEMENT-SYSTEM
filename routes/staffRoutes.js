import express from "express";
import {getAppointment, confirmAppointment, appointmentHistory, postAnnouncements, getMessage} from '../controller/staffControllers.js'

const router = express.Router();

// Get All History
router.get('/', getAppointment);

// Staff can confirm the appointment by the student
router.get('/', confirmAppointment);

// Staff can view all history appointments
router.get('/', appointmentHistory);

// Staff can post announcements
router.post("/", postAnnouncements);

// Staff can get messages for those who have concerns
router.get("/", getMessage);

export default router;