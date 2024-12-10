import express from "express";
import {getHistory, addApp, cancelApp, updateApp, getAnnouncements, handleGoogleLogin, logoutController, updateProfile, getUser} from '../controllers/studentApp.js'
import StudentApp from '../models/studentApp.js';
import nodemailer from 'nodemailer';

const router = express.Router();

router.get('/appointments', getHistory);

router.get('/user', getUser);


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

    res.json({ message: 'Your message has been received. A confirmation email has been sent to your inbox.' });
  } catch (error) {
    console.error('Error sending acknowledgment email:', error);
    res.status(500).json({ message: 'Failed to send acknowledgment email', error: error.message });
  }
});

export default router;

