import mongoose from 'mongoose';
const {Schema} = mongoose;


const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;

