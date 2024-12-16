import express from "express";
import {getHistory, addApp, cancelApp, updateApp, getAnnouncements, handleGoogleLogin, logoutController, updateProfile, Users} from '../controllers/studentApp.js'
import StudentApp from '../models/studentApp.js';
import nodemailer from 'nodemailer';
import Concerns from '../models/concerns.js';


const router = express.Router();

router.get('/appointments', getHistory);

router.get('/user', Users);

router.post('/appointments', addApp);

router.delete('/appointments/:id', cancelApp);

router.put('/appointments/:id', updateApp);

router.get('/announcements', getAnnouncements);

router.post('/google-login', handleGoogleLogin);

router.put('/update-profile/:googleId', updateProfile);

router.post('/logout', logoutController);

// Email configuration (setup transporter)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'universityguidance.noreply@gmail.com',
    pass: 'xfoy rlig vnbl jrlo'
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@student\.buksu\.edu\.ph$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Send acknowledgment email
    const mailOptions = {
      from: {
        name: 'University Guidance',
        address: process.env.EMAIL_USER || 'universityguidance.noreply@gmail.com'
      },
      to: email,
      subject: 'Thank You for Reaching Out!',
      html: `
        <h1>Hi ${fullName},</h1>
        <p>Thank you for your concern. We have received your message and our support team will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>BukSU Guidance Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    const newMessage = new Concerns({
      fullName,
      email,
      message,
    });

    await newMessage.save();

    res.json({ message: 'Thank you for your concern' });
  } catch (error) {
    console.error('Error sending acknowledgment email:', error);
    res.status(500).json({ message: 'Failed to send acknowledgment email', error: error.message });
  }
});

// Route to fetch a specific calendar event by ID
router.get('/calendar/:studentId', async (req, res) => {
  try {
      const studentId = req.params.studentId;
      if (!studentId) {
          return res.status(400).json({ error: 'Student ID is required' });
      }

      // Fetch the specific appointment using the studentId
      const appointment = await StudentApp.findOne({ studentId });
      if (!appointment) {
          return res.status(404).json({ error: 'Appointment not found' });
      }

      // Map the appointment to calendar event format
      const [year, month, day] = appointment.date.split('-').map(num => parseInt(num, 10));
      const [hours, minutes] = appointment.time.split(':').map(num => parseInt(num, 10));

      const startDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
      const endDateStr = new Date(new Date(startDateStr).getTime() + 60 * 60 * 1000).toISOString();

      const event = {
          title: `${appointment.appType} - ${appointment.purpose}`,
          start: startDateStr,
          end: endDateStr,
          status: appointment.status,
          backgroundColor: appointment.status === 'Confirmed' ? '#14a44d' : '#FFB703',
          source: 'database',
          extendedProps: {
              userName: appointment.userName,
              department: appointment.department,
              status: appointment.status
          }
      };

      // Respond with the event
      res.status(200).json(event);
  } catch (error) {
      console.error('Error fetching calendar event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;

