import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './adminNavbar';
import Sidebar from './adminSidebar';
import { MdEdit, MdDelete } from "react-icons/md";

function Status() {
    const [appointment, setAppointments] = useState([]); // State to store appointments

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:3001');
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments(); // Fetch appointments when component mounts
    }, []);

    return (
        <>
            <NavBar />
            <div className="card1">
                <Sidebar />
                <div className="card3">
                    <h1>Add Staff</h1>
                    <div className="app">
                       <div className="addStaff">
                        <input type="text" className='inp1' placeholder='Full Name' required/>
                        <input type="email" className='inp1' placeholder='Email' required />
                        <input type="text" className='inp1' placeholder='Add as Staff' readOnly/><br /><br /><br /><br /><br />
                        <button className='con'>Send Invites</button>
                       </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Status;
