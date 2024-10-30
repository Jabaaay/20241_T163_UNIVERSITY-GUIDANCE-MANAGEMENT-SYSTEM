import mongoose from "mongoose";
const {Schema} = mongoose;

const addStaff = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }

})

const adminModel = mongoose.model('admin', addStaff);
export default adminModel;
