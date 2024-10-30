import Admin from "../models/adminModels.js"
import StudentApp from "../models/studentApp.js"

// admin can add staff
const addStaff = async (req, res) => {
    try {
        const adminStaff = new Admin(req.body);
        const saved = await adminStaff.save();
        res.status(200).json(saved);
        
    } catch (error) {
        console.log(error)
    }
}
// admin can see all the history of appointments
const getHistory = async (req, res) => {
    try {
        const studentApp = await StudentApp.find();

        
        res.send(studentApp);

    } catch (error) {
        console.log(error)
    }
}


export {addStaff, getHistory};