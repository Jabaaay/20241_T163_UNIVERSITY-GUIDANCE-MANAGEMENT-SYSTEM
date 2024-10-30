import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './navbar'; // Import the NavBar component
import Sidebar from './sidebar';



function History() {

   
  return (
  
    <>
    <NavBar />
  <div className="card1">
  <Sidebar />
    <div className="card3">

        <h1>History</h1>

        <div className="app">
        <table className='t1'>
                <tr className='tr1'>
                  <th className='th1'>Appointment Type</th>
                  <th className='th1'>Purpose</th>
                  <th className='th1'>Date</th>
                  <th className='th1'>Time</th>
                  <th className='th1'>Status</th>
                </tr>
                  <tr className='tr1'>
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

export default History;
