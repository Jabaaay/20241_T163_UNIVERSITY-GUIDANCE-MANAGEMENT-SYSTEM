import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './navbar';
import Sidebar from './sidebar';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";


function Dashboard() {
    const location = useLocation();
    const { userInfo } = location.state || {};
    const navigate = useNavigate();  // Initialize the navigate function


    const [newStudentApp, setNewStudentApp] = useState({
        appType: '',
        purpose: '',
        date: '',
        time: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudentApp((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddStudentApp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudentApp)
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            await fetchStudent();
            setNewStudentApp({ appType: '', purpose: '', date: '', time: '' });
        

        } catch (error) {
            console.error('error:', error);
        }
    };

    const onAppointment = () => {

        Swal.fire({
            icon: 'success',
            title: 'Appoinment Successfully',
            text: 'Just Wait for the Approval',
            confirmButtonText: 'OK',
            confirmButtonColor: '#FFB703',
            customClass:
            {
                
                confirmButton: 'swal-btn'
                
            }
            
        }).then(() => {
            navigate("/status"); // Redirect to login page after alert confirmation
        });

    }

    return (
        <>
            <NavBar />
            <div className="card1">
                <Sidebar />
                <div className="card3">
                    <h1>Book an Appointment</h1>
                    <form onSubmit={handleAddStudentApp}>

                    <div className="app">
                  
                        <div className="type">
                            <h2>Select Appointment Type: </h2>
                            <div className="input1">
                                <select className='dropdown' name="appType" value={newStudentApp.appType} onChange={handleInputChange}>
                                    <option value="">Select Type</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Group">Group</option>
                                </select>
                            </div><br /><br />

                            <h2>Purpose: </h2>
                            <div className="input1">
                                <select className='dropdown' name="purpose" value={newStudentApp.purpose} onChange={handleInputChange}>
                                    <option value="">Select a purpose</option>
                                    <option value="Academic Counseling">Academic Counseling</option>
                                    <option value="Emotional Support">Emotional Support</option>
                                    <option value="Career Guidance">Career Guidance</option>
                                    <option value="Behavioral Concerns">Behavioral Concerns</option>
                                </select>
                            </div>
                        </div>

                        <div className="purpose">
                       
                            <h2>Select Date and Time</h2>
                            
                            <div className="input1">
                            <select className='dropdown' name="date" value={newStudentApp.date} onChange={handleInputChange}>
                                    <option value="">Select a date</option>
                                    <option value="8 - 9:00am">8 - 9:00 am</option>
                                    <option value="9 - 10:00am">9 - 10:00 am</option>
                                    <option value="10 - 11:00am">10 - 11:00 am</option>
                                    <option value="1 - 2:00pm">1 - 2:00 pm</option>
                                    <option value="2 - 3:00pm">2 - 3:00 pm</option>
                                    <option value="3 - 4:00pm">3 - 4:00 pm</option>
                                </select>
                                </div>

                            <div className="input1">
                                <select className='dropdown' name="time" value={newStudentApp.time} onChange={handleInputChange}>
                                    <option value="">Select a time slot</option>
                                    <option value="8 - 9:00am">8 - 9:00 am</option>
                                    <option value="9 - 10:00am">9 - 10:00 am</option>
                                    <option value="10 - 11:00am">10 - 11:00 am</option>
                                    <option value="1 - 2:00pm">1 - 2:00 pm</option>
                                    <option value="2 - 3:00pm">2 - 3:00 pm</option>
                                    <option value="3 - 4:00pm">3 - 4:00 pm</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className='btn' onClick={onAppointment}>Confirm</button>
                    
                    </form>
                </div>
                
            </div>
        </>
    );
}

export default Dashboard;
