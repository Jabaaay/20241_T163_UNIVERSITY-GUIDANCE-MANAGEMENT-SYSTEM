import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './adminNavbar.jsx';
//import Sidebar from './sidebar';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Sidebar from './adminSidebar.jsx';


function Dashboard() {

    return (
        <>
            <NavBar />
            <div className="card1">
                <Sidebar />
                <div className="card3">

      <div className="his">
        <h1>Reports</h1>

        <select name="" id="" className='opt1'>
                                    <option value="">Select College</option>
                                    <option value="">COT</option>
                                    <option value="">COB</option>
                                    <option value="">CPAG</option>
                                    <option value="">CON</option>
                                    <option value="">COE</option>
                                    <option value="">CAS</option>
                                    
                                </select>

        </div>

        <div className="app">
        <table className='t1'>
                <tr className='tr1'>
                <th className='th1'>ID</th>
                  <th className='th1'>Appointment Type</th>
                  <th className='th1'>Purpose</th>
                  <th className='th1'>Date</th>
                  <th className='th1'>Time</th>
                  <th className='th1'>Status</th>
                </tr>
                  <tr className='tr1'>
                  <td className='td1'>1</td>
                    <td className='td1'>Individual</td>
                    <td className='td1'>Academic Counseling</td>
                    <td className='td1'>10 - 15 - 2024</td>
                    <td className='td1'>9 - 10:00 am</td>
                    <td className='td1'>Completed</td>

                  </tr>
            </table>
          
    

        </div>
        
    </div>
                
            </div>
        </>
    );
}

export default Dashboard;
