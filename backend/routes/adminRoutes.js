import express from "express";
import {getHistory, confirmAppointment, createAnnouncement, getAnnouncements, handleGoogleLogin, addStaff} from '../controllers/adminControllers.js'
import multer from "multer";


const router = express.Router();

router.get('/appointments', getHistory);


// router.put('/:id', confirmAppointment);

router.put('/confirm/:id', confirmAppointment);


const upload = multer({ dest: 'uploads/' });

router.post('/announcements', upload.single('file'), createAnnouncement);

router.get('/announcements', getAnnouncements);

router.post('/google-login', handleGoogleLogin);

router.post('/add', addStaff);

export default router;
