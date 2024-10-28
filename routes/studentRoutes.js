import express from "express";
import {getHistory, getStatus, deleteAppointment, addAppointment, updateAppointment, sendMessage} from '../controller/studentControllers.js'

const router = express.Router();

// Student can get history
router.get('/', getHistory);

// Student can track status
router.get('/', getStatus);

//Student can delete Appointment
router.delete('/:id', deleteAppointment);

//Student can add Appointment
router.post("/", addAppointment);

// Student can update Appointment
router.put("/:id", updateAppointment);

//Student can send a Message for concerns
router.post("/", sendMessage);

export default router;



