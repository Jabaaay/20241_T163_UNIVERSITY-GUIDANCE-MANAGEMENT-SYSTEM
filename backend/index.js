import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;


// Middleware for CORS
const corsOptions = {
    origin: ["http://localhost:5173"], 
    credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware here
app.use(express.json()); // Middleware to parse JSON payloads

// Import routes
import studentRoute from './routes/studentApp.js';
import adminRoute from './routes/adminRoutes.js';

// Use routes
app.use('/', studentRoute);
app.use('/admin', adminRoute);


// Database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
};

// Mongoose event listeners
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from DB');
});

mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});





app.listen(PORT, () => {
    connect();
    console.log(`Listening on port ${PORT}`);
});