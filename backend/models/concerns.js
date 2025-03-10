// In your models folder (e.g., models/ContactMessage.js)
import mongoose from 'mongoose';
const {Schema} = mongoose;

const ContactMessageSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread', // Default is 'unread'
  },
});

const concerns = mongoose.model('concerns', ContactMessageSchema);
export default concerns;


