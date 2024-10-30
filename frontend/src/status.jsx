import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './navbar';
import Sidebar from './sidebar';
import { MdEdit, MdDelete } from "react-icons/md";

function Status() {
    const [appointment, setAppointments] = useState([]); // State to store appointments

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:3001'); // Replace with your API endpoint
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
                    <h1>Status</h1>
                    <div className="app">
                        <table className='t1'>
                            <thead>
                                <tr className='tr1'>
                                    <th className='th1'>ID</th>
                                    <th className='th1'>Appointment Type</th>
                                    <th className='th1'>Purpose</th>
                                    <th className='th1'>Date</th>
                                    <th className='th1'>Time</th>
                                    <th className='th1'>Status</th>
                                    <th className='th1'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment.length > 0 ? (
                                    appointment.map(appointment => (
                                        <tr className='tr1' key={appointment._id}>
                                            <td className='td1'>{appointment._id}</td>
                                            <td className='td1'>{appointment.appType}</td>
                                            <td className='td1'>{appointment.purpose}</td>
                                            <td className='td1'>{appointment.date}</td>
                                            <td className='td1'>{appointment.time}</td>
                                            <td className='td1'>
                                                {appointment.status === 'Pending' ? 'Pending' : 
                                                appointment.status === 'Confirmed' ? 'Confirmed' : 'Pending'}
                                            </td>
                                            <td className='td1'>
                                                <div className="act">
                                                    <MdEdit className='edit' />
                                                    <MdDelete className='del' />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className='text-center'>No Appointments</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Status;
