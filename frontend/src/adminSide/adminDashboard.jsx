import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './adminNavbar.jsx';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Sidebar from './adminSidebar.jsx';import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {

    const data = [
        { name: 'CPAG', Appointments: 410},
        { name: 'COB',  Appointments: 100},
        { name: 'COE',  Appointments: 310},
        { name: 'CAS',  Appointments: 430},
        { name: 'CON',  Appointments: 272},
        { name: 'COT',  Appointments: 103},
      ];


    return (
        <>
            <NavBar />
            <div className="card1">
                <Sidebar />
                <div className="card3">
                    <div className="dis">
                        <div className="dash"> 
                            <h2 className='da2'>Confirmed</h2>
                            <h1 className='da'>0</h1>
                        </div>
                        <div className="dash"> 
                        <h2 className='da2'>Cancelled</h2>
                        <h1 className='da'>0</h1>
                             </div>
                        <div className="dash"> 
                        <h2 className='da2'>Total Appointments</h2>
                        <h1 className='da'>0</h1>
                             </div>
                    </div>
                    <br />
                    <div className="dat">
                        <div className="head">
                            <div className="char">
                                <h1>Chart</h1>
                            </div>
                            <div className="opt">
                                <select name="" id="" className='opt1'>
                                    <option value="">Select Year</option>
                                    <option value="">Jan 1 - Dec 31 2020</option>
                                    <option value="">Jan 1 - Dec 31 2021</option>
                                    <option value="">Jan 1 - Dec 31 2022</option>
                                    <option value="">Jan 1 - Dec 31 2023</option>
                                    <option value="">Jan 1 - Dec 31 2024</option>
                                    <option value="">Jan 1 - Dec 31 2025</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="bod">
                            <div className="chart">
                            <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: -30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Appointments" stroke="#8884d8" activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;