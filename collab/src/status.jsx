import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './navbar'; // Import the NavBar component
import Sidebar from './sidebar';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";



function Status() {

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
                  <th className='th1'>Appointment Type</th>
                  <th className='th1'>Purpose</th>
                  <th className='th1'>Date</th>
                  <th className='th1'>Time</th>
                  <th className='th1'>Status</th>
                  <th className='th1'>Actions</th>
                </tr>
              </thead>
              <tbody>

                  <tr className='tr1'>
                    <td className='td1'>Individual</td>
                    <td className='td1'>Academic Counseling</td>
                    <td className='td1'>10 - 15 - 2024</td>
                    <td className='td1'>9 - 10:00 am</td>
                    <td className='td1'>Waiting for Approval</td>
                    <td className='td1'>
                      <div className="act">
                      <MdEdit  className='edit'/>
                      <MdDelete className='del'/>
                      </div>
                    </td>
                  </tr>
                  
        
              </tbody>
            </table>
    

        </div>
        
    </div>
    
  </div>

  


  </>
    
    
  );





}

export default Status;
