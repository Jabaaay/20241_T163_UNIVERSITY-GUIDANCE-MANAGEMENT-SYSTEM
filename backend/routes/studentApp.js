import express from "express";
import {getHistory, addApp, cancelApp, updateApp, confirmAppointment, createAnnouncement, getAnnouncements, handleGoogleLogin} from '../controllers/studentApp.js'
import multer from "multer";


const router = express.Router();

router.get('/appointments', getHistory);

router.post('/appointments', addApp);

router.delete('/appointments/:id', cancelApp);

router.put('/appointments/:id', updateApp);

// router.put('/:id', confirmAppointment);

router.put('/confirm/:id', confirmAppointment);


const upload = multer({ dest: 'uploads/' });

router.post('/announcements', upload.single('file'), createAnnouncement);

router.get('/announcements', getAnnouncements);

router.post('/google-login', handleGoogleLogin);


export default router;

